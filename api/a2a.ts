/**
 * Vercel Serverless Function - A2A Endpoint
 * JSON-RPC 2.0 over POST /api/a2a — 4 read-only skills.
 *
 * The catalog is imported statically so the serverless bundler inlines it.
 * Runtime `import('file://' + .../src/data/resources.ts)` caused
 * ERR_MODULE_NOT_FOUND in /var/task and is deliberately forbidden here.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  catalogResources,
  catalogCategories,
  computeStats,
  normalizeText,
  searchCatalog,
  scoreResource,
  TRACKS,
  isPricing,
  type CatalogResource,
  type Pricing,
  type SortId,
  type TrackId,
} from '../src/lib/catalog';
import type { Category } from '../src/data/resources';

// ---------------------------------------------------------------------------
// A2A / JSON-RPC types
// ---------------------------------------------------------------------------

interface A2AMessagePart {
  kind?: 'text' | 'data' | 'file';
  type?: string;
  text?: string;
  data?: unknown;
  mimeType?: string;
}

interface A2AMessage {
  role: 'user' | 'agent';
  parts: A2AMessagePart[];
  messageId?: string;
  contextId?: string;
}

interface A2ATask {
  id: string;
  contextId: string;
  status: { state: 'completed' | 'failed'; timestamp: string };
  artifacts: Array<{ artifactId: string; name: string; parts: A2AMessagePart[] }>;
  metadata?: unknown;
}

interface JsonRpcResponse {
  jsonrpc: '2.0';
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
  id: string | number | null;
}

const ERROR = {
  PARSE_ERROR: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603,
} as const;

const MAX_SEARCH_LIMIT = 60;
const DEFAULT_SEARCH_LIMIT = 20;

// ---------------------------------------------------------------------------
// Query understanding
// ---------------------------------------------------------------------------

const CATEGORY_ALIASES: Record<string, string> = {
  mcp: 'mcp-protocols', a2a: 'mcp-protocols', protocols: 'mcp-protocols', protocolos: 'mcp-protocols', 'llms.txt': 'mcp-protocols',
  'agent-infra': 'agent-infra', sdks: 'agent-infra', evals: 'agent-infra', frameworks: 'agent-infra', observabilidade: 'agent-infra', sandbox: 'agent-infra',
  icons: 'icons-assets', icones: 'icons-assets', colors: 'icons-assets', cores: 'icons-assets', svg: 'icons-assets', assets: 'icons-assets',
  'design-systems': 'design-systems', tokens: 'design-systems', a11y: 'design-systems', acessibilidade: 'design-systems', headless: 'design-systems',
  'agent-templates': 'agent-templates', templates: 'agent-templates', starters: 'agent-templates', boilerplates: 'agent-templates',
  modelos: 'agent-templates', exemplos: 'agent-templates', 'voice-agents': 'agent-templates', 'deep-research': 'agent-templates',
  'rag-templates': 'agent-templates', copilots: 'agent-templates',
  'design-ui': 'design-ui', 'design e ui': 'design-ui',
  'ai-agents': 'ai-agents', 'ia e agentes': 'ai-agents',
  'dev-tools': 'dev-tools', 'dev tools': 'dev-tools', seguranca: 'dev-tools',
};

const TRACK_ALIASES: Record<string, TrackId> = {
  'design-ui': 'design-ui', 'design e ui': 'design-ui', design: 'design-ui', ui: 'design-ui',
  'ai-agents': 'ai-agents', 'ia e agentes': 'ai-agents', agentes: 'ai-agents',
  'dev-tools': 'dev-tools', 'dev tools': 'dev-tools', ferramentas: 'dev-tools', seguranca: 'dev-tools',
};

const TAG_ALIASES: Record<string, string> = {
  'free-mcp': 'free-mcp', 'free mcp': 'free-mcp', 'mcp free': 'free-mcp',
  'mcp gratis': 'free-mcp', 'mcp grátis': 'free-mcp', 'mcp gratuito': 'free-mcp',
  'mcp gratuitos': 'free-mcp', 'mcp gratuita': 'free-mcp', 'mcp gratuitas': 'free-mcp',
  'servidores mcp gratis': 'free-mcp', 'mcp database': 'mcp-database',
  'mcp databases': 'mcp-database', 'mcp banco de dados': 'mcp-database',
  'mcp design': 'mcp-design', 'mcp cloud': 'mcp-cloud', 'mcp nuvem': 'mcp-cloud',
  'mcp coding': 'mcp-coding', 'mcp browser': 'mcp-browser',
  'mcp automation': 'mcp-automation', 'mcp automacao': 'mcp-automation', 'mcp proxy': 'mcp-proxy',
  'agent-template': 'agent-template', 'agent templates': 'agent-template',
  'template-starter': 'template-starter', 'template-research': 'template-research',
  'template-multi-agent': 'template-multi-agent', 'template-coding': 'template-coding',
  'template-browser': 'template-browser', 'template-voice': 'template-voice',
  'template-ui': 'template-ui', 'template-local': 'template-local',
};

interface ParsedQuery {
  text: string;
  limit?: number;
  pricing?: Pricing;
  track?: TrackId;
  type?: string;
  agentReady?: boolean;
  tag?: string;
  sort?: SortId;
}

const FILTER_KEYS = 'limite|limit|pricing|preco|price|track|trilha|type|tipo|agent|sort|ordem';
const FILTER_INLINE = new RegExp(`^(${FILTER_KEYS})\\s*[:=]\\s*(.+)$`, 'i');
const FILTER_BARE = new RegExp(`^(${FILTER_KEYS})\\s*[:=]?$`, 'i');

function parseSearchInput(input: string): ParsedQuery {
  const tokens = input.trim().split(/\s+/).filter(Boolean);
  const result: ParsedQuery = { text: '' };
  const textTokens: string[] = [];
  const sortValues: SortId[] = ['relevance', 'featured', 'az', 'opensource'];

  const applyFilter = (rawKey: string, value: string) => {
    const key = rawKey.toLowerCase();
    if (key === 'limite' || key === 'limit') {
      const parsed = Number(value);
      if (Number.isFinite(parsed) && parsed > 0) result.limit = Math.min(MAX_SEARCH_LIMIT, Math.floor(parsed));
    } else if (key === 'pricing' || key === 'preco' || key === 'price') {
      if (isPricing(value)) result.pricing = value;
      else if (value === 'unknown' || value === 'desconhecido') result.pricing = undefined;
    } else if (key === 'track' || key === 'trilha') {
      result.track = TRACK_ALIASES[normalizeText(value)];
    } else if (key === 'type' || key === 'tipo') {
      result.type = normalizeText(value);
    } else if (key === 'agent') {
      result.agentReady = /^(true|1|sim|yes)$/i.test(value);
    } else if (key === 'sort' || key === 'ordem') {
      if ((sortValues as string[]).includes(value)) result.sort = value as SortId;
    }
  };

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    const inline = token.match(FILTER_INLINE);
    if (inline) {
      applyFilter(inline[1], inline[2].trim());
      continue;
    }
    if (FILTER_BARE.test(token)) {
      const next = tokens[index + 1];
      if (next !== undefined && !FILTER_BARE.test(next) && !FILTER_INLINE.test(next)) {
        applyFilter(token, next);
        index += 1;
        continue;
      }
    }
    textTokens.push(token);
  }

  const joined = textTokens.join(' ').trim();
  const normalized = normalizeText(joined);
  result.tag = TAG_ALIASES[normalized] ?? TAG_ALIASES[joined.toLowerCase()];
  if (result.tag) {
    result.text = '';
    result.limit = result.limit ?? MAX_SEARCH_LIMIT;
  } else {
    result.text = joined;
  }
  return result;
}

function asTextParts(message: A2AMessage | undefined): string[] {
  if (!message || !Array.isArray(message.parts)) return [];
  return message.parts
    .filter((p) => p && typeof p === 'object' && (p.kind === 'text' || p.type === 'text') && typeof p.text === 'string')
    .map((p) => p.text as string);
}

function createTask(requestId: string | number | null, markdown: string, data: unknown): A2ATask {
  const id = typeof requestId === 'string' ? requestId : `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  return {
    id,
    contextId: `ctx-${id}`,
    status: { state: 'completed', timestamp: new Date().toISOString() },
    artifacts: [
      { artifactId: `${id}-text`, name: 'Human-readable summary', parts: [{ kind: 'text', text: markdown }] },
      { artifactId: `${id}-data`, name: 'Structured data', parts: [{ kind: 'data', data }] },
    ],
  };
}

function jsonError(id: string | number | null, code: number, message: string, data?: unknown): JsonRpcResponse {
  return { jsonrpc: '2.0', error: { code, message, ...(data !== undefined ? { data } : {}) }, id };
}

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

function handleListCategories() {
  const stats = computeStats(catalogResources);
  const categories = catalogCategories.map((c) => ({
    id: c.id,
    label: c.label,
    count: stats.byCategory[c.id] ?? 0,
    track: TRACKS.find((t) => (t.categoryIds as string[]).includes(c.id))?.id ?? null,
  }));
  const markdown = [
    `## Categorias Disponíveis (${stats.categories})`,
    '',
    ...categories.map((c) => `- **${c.label}** (${c.count}) — ${c.id}`),
    '',
    `**Trilhas:** ${TRACKS.map((t) => `${t.id} (${stats.byTrack[t.id]})`).join(', ')}`,
    '',
    `**${stats.unknownPricing} recursos sem classificação de preço** — não foi atribuída nenhuma classificação presumida.`,
    `**Agent-Ready:** ${stats.agentReady} recursos com \`agentConsumable: true\` declarado.`,
    `**Busca:** \`search_resources\` aceita \`limit\` até ${MAX_SEARCH_LIMIT}.`,
  ].join('\n');
  return {
    markdown,
    data: {
      categories,
      tracks: TRACKS.map((t) => ({ id: t.id, label: t.label, count: stats.byTrack[t.id], categoryIds: t.categoryIds })),
      byPricing: stats.byPricing,
      unknownPricing: stats.unknownPricing,
      agentReady: stats.agentReady,
      maxSearchLimit: MAX_SEARCH_LIMIT,
    },
  };
}

function handleFilterByCategory(names: string[]) {
  const tracks = new Set<TrackId>();
  const cats = new Set<Category>();
  for (const raw of names) {
    const name = normalizeText(raw);
    if (!name) continue;
    const resolved = CATEGORY_ALIASES[name];
    if (resolved && (TRACKS.some((t) => t.id === resolved))) tracks.add(resolved as TrackId);
    else if (resolved) cats.add(resolved as Category);
    else if (TRACK_ALIASES[name]) tracks.add(TRACK_ALIASES[name]);
    else if ((catalogCategories as Array<{ id: string }>).some((c) => c.id === name)) cats.add(name as Category);
  }
  if (tracks.size === 0 && cats.size === 0) {
    const available = catalogCategories.map((c) => c.id).join(', ');
    return {
      markdown: `❌ Nenhuma categoria correspondente. Disponíveis: ${available}. Trilhas: ${TRACKS.map((t) => t.id).join(', ')}`,
      data: { error: 'Categoria não encontrada', available, tracks: TRACKS.map((t) => t.id) },
    };
  }
  const filtered = catalogResources.filter((r) => tracks.has(r.track) || cats.has(r.category));
  return {
    markdown: `## Recursos por Categoria (${filtered.length})\n\n` +
      filtered.map((r) => `- **${r.name}** (${r.category}) - ${r.url}\n  ${r.description}`).join('\n\n'),
    data: filtered,
  };
}

function handleSearchResources(input: string) {
  const parsed = parseSearchInput(input);
  if (!parsed.text && !parsed.tag && !parsed.pricing && !parsed.track && !parsed.type && parsed.agentReady === undefined) {
    return { markdown: '❌ Query de busca não fornecida.', data: { error: 'Query vazia' } };
  }
  const limit = parsed.limit ?? DEFAULT_SEARCH_LIMIT;
  let matched: CatalogResource[];
  if (parsed.tag) {
    matched = catalogResources.filter((r) => r.tags.some((t) => normalizeText(t) === parsed.tag));
  } else {
    matched = searchCatalog(catalogResources, {
      query: parsed.text,
      pricing: parsed.pricing,
      track: parsed.track,
      type: parsed.type,
      agentReady: parsed.agentReady,
      sort: parsed.sort,
    });
  }
  const results = matched.slice(0, limit);
  const note = parsed.tag ? `> Tag canônica: \`${parsed.tag}\` · limite ${limit}\n\n` : `> Limite ${limit}\n\n`;
  return {
    markdown: `## Busca: "${input}" (${results.length} de ${catalogResources.length})\n\n${note}` +
      results.map((r) => `- **${r.name}** [${r.category}] - ${r.url}\n  ${r.description}`).join('\n\n'),
    data: results,
  };
}

function handleGetResourceDetails(identifier: string) {
  const needle = normalizeText(identifier);
  const resource = catalogResources.find((r) => normalizeText(r.id) === needle || normalizeText(r.name) === needle);
  if (!resource) {
    return { markdown: `❌ Recurso "${identifier}" não encontrado.`, data: { error: 'Não encontrado', identifier } };
  }
  const markdown = [
    `## ${resource.name}`,
    '',
    `**ID:** ${resource.id}`,
    `**URL:** ${resource.url}`,
    `**Categoria:** ${resource.category}`,
    `**Trilha:** ${resource.track}`,
    `**Tags:** ${resource.tags.join(', ')}`,
    `**Preço:** ${resource.pricing ?? 'desconhecido'}`,
    `**Agent-Ready:** ${resource.agentConsumable === true ? 'sim' : resource.agentConsumable === false ? 'não' : 'desconhecido'}`,
    '',
    `**Descrição:**\n${resource.description}`,
  ].join('\n');
  return { markdown, data: resource };
}

function dispatch(text: string) {
  const raw = text.trim().toLowerCase();
  const lower = normalizeText(text);

  if (raw.startsWith('list_categories') || lower === 'list categories' ||
      lower.includes('listar categorias') || lower.includes('quais categorias') || lower.includes('categorias disponiveis')) {
    return handleListCategories();
  }

  if (raw.startsWith('filter_by_category') || lower.startsWith('filter by category') ||
      lower.startsWith('filtrar por categoria') || lower.includes('recursos de ') ||
      lower.includes('mostre ') || lower.includes('filtre por ')) {
    let catsText = '';
    if (text.includes(':')) catsText = (text.split(':').slice(1).join(':')).trim();
    else if (raw.startsWith('filter_by_category ')) catsText = text.slice('filter_by_category '.length).trim();
    else if (lower.startsWith('filter by category ')) catsText = text.slice('filter by category '.length).trim();
    else if (lower.includes('recursos de ')) catsText = text.slice(text.toLowerCase().indexOf('recursos de ') + 12).trim();
    else if (lower.includes('filtre por ')) catsText = text.slice(text.toLowerCase().indexOf('filtre por ') + 11).trim();
    else if (lower.includes('mostre ')) catsText = text.slice(text.toLowerCase().indexOf('mostre ') + 7).trim();
    return handleFilterByCategory(catsText.split(/[,;]/).map((s) => s.trim()).filter(Boolean));
  }

  if (raw.startsWith('search_resources') || lower.startsWith('search resources') ||
      lower.startsWith('buscar ') || lower.startsWith('busque ') || lower.includes('buscar por ') ||
      lower.includes('mcp gratis') || lower.includes('mcp gratuito') || lower === 'free-mcp' ||
      lower === 'free mcp' || lower === 'agent-template' || lower.startsWith('template-') ||
      /\b(limit|pricing|track|type|agent|sort)\s*[:=]/i.test(text)) {
    return handleSearchResources(text.replace(/^(?:search_resources|search resources|buscar por|buscar|busque)\s*:?\s*/i, ''));
  }

  if (raw.startsWith('get_resource_details') || lower.startsWith('get resource details') ||
      lower.startsWith('detalhes do recurso') || lower.startsWith('informacoes sobre ') || lower.startsWith('url do recurso ')) {
    let id = '';
    if (text.includes(':')) id = (text.split(':').slice(1).join(':')).trim();
    else if (raw.startsWith('get_resource_details ')) id = text.slice('get_resource_details '.length).trim();
    else if (lower.startsWith('get resource details ')) id = text.slice('get resource details '.length).trim();
    else if (lower.startsWith('detalhes do recurso ')) id = text.slice(20).trim();
    else if (lower.startsWith('informacoes sobre ')) id = text.slice(18).trim();
    else if (lower.startsWith('url do recurso ')) id = text.slice(15).trim();
    return handleGetResourceDetails(id);
  }

  // Friendly fallback: treat unknown plain text as a search, never as a silent listing.
  return handleSearchResources(text);
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export async function handleA2ARequest(body: unknown): Promise<JsonRpcResponse> {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return jsonError(null, ERROR.INVALID_REQUEST, 'Invalid Request');
  }
  const request = body as Record<string, unknown>;
  const id = (typeof request.id === 'string' || typeof request.id === 'number') ? request.id : null;
  if (request.jsonrpc !== '2.0') return jsonError(id, ERROR.INVALID_REQUEST, 'jsonrpc must be "2.0"');
  if (request.method !== 'message/send') return jsonError(id, ERROR.METHOD_NOT_FOUND, `Method not found: ${String(request.method)}`);
  const params = request.params as Record<string, unknown> | undefined;
  const message = params?.message as A2AMessage | undefined;
  const texts = asTextParts(message);
  if (!message || texts.length === 0) {
    return jsonError(id, ERROR.INVALID_PARAMS, 'params.message.parts must contain a text part');
  }
  try {
    const { markdown, data } = dispatch(texts.join(' '));
    return { jsonrpc: '2.0', result: createTask(id, markdown, data), id };
  } catch (error) {
    return jsonError(id, ERROR.INTERNAL_ERROR, 'Internal error', error instanceof Error ? error.message : String(error));
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  if (req.method !== 'POST') { res.status(405).json(jsonError(null, ERROR.METHOD_NOT_FOUND, 'Use POST /api/a2a')); return; }

  let body: unknown = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); }
    catch { res.status(200).json(jsonError(null, ERROR.PARSE_ERROR, 'Parse error')); return; }
  }
  const response = await handleA2ARequest(body);
  res.status(200).json(response);
}

/** Exported for bundled integration tests that exercise the deploy artifact. */
export const __internals = { MAX_SEARCH_LIMIT, CATEGORY_ALIASES, TAG_ALIASES, scoreResource };
