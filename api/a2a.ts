/**
 * Vercel Serverless Function - A2A Endpoint (Hardened)
 * ----------------------------------------------------
 * Protocolo A2A (Agent2Agent) com JSON-RPC 2.0
 * 4 skills somente leitura: list_categories, filter_by_category, search_resources, get_resource_details
 * Retorna Task válido A2A com artifacts (text + data separados)
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------------------
// Tipos de domínio
// ---------------------------------------------------------------------------

interface Resource {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

interface Category {
  id: string;
  label: string;
  icon: string;
  description: string;
}

interface NormalizedResource {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  categoryLabel: string;
  tags: string[];
  featured: boolean;
}

// ---------------------------------------------------------------------------
// Tipos A2A / JSON-RPC 2.0
// ---------------------------------------------------------------------------

interface JsonRpcRequest {
  jsonrpc: '2.0';
  method: string;
  params?: unknown;
  id: string | number | null;
}

interface JsonRpcError {
  code: number;
  message: string;
  data?: unknown;
}

interface JsonRpcResponse {
  jsonrpc: '2.0';
  result?: unknown;
  error?: JsonRpcError;
  id: string | number | null;
}

// A2A Message Part - suporta kind (A2A) e type (legado)
interface A2AMessagePart {
  kind?: string;      // A2A spec: "text" | "data" | "file"
  type?: string;      // compat: "text" | "data"
  text?: string;      // quando kind/type === "text"
  data?: unknown;     // quando kind/type === "data"
  mimeType?: string;  // opcional
  file?: {            // opcional
    name?: string;
    bytes?: string;   // base64
    uri?: string;
  };
}

interface A2AMessage {
  role: 'user' | 'agent';
  parts: A2AMessagePart[];
  messageId?: string;
  contextId?: string;
  taskId?: string;
}

interface A2AParams {
  message: A2AMessage;
  metadata?: unknown;
}

// A2A Task - resposta canônica
interface A2ATask {
  id: string;
  contextId: string;
  status: {
    state: 'submitted' | 'working' | 'input-required' | 'completed' | 'canceled' | 'failed';
    timestamp: string;
    message?: A2AMessage;
  };
  artifacts?: A2AArtifact[];
  metadata?: unknown;
}

interface A2AArtifact {
  artifactId: string;
  name?: string;
  description?: string;
  parts: A2AMessagePart[];
}

const ERROR = {
  PARSE_ERROR: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603,
} as const;

// ---------------------------------------------------------------------------
// Carregamento do catálogo (import dinâmico ESM/tsx)
// ---------------------------------------------------------------------------

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const dataPath = path.join(projectRoot, 'src/data/resources.ts');

let resources: NormalizedResource[] = [];
let categories: Category[] = [];

async function loadCatalog(): Promise<{ resources: NormalizedResource[]; categories: Category[] }> {
  if (resources.length > 0) return { resources, categories };
  const mod = await import('file://' + dataPath);
  resources = (mod.resources || []).map((r: Resource) => ({
    id: r.id,
    name: r.name,
    url: r.url,
    description: r.description,
    category: r.category,
    categoryLabel: (mod.categories || []).find((c: Category) => c.id === r.category)?.label ?? r.category.replace('-', ' '),
    tags: r.tags || [],
    featured: r.featured ?? false,
  }));
  categories = mod.categories || [];
  return { resources, categories };
}

function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function nowISO(): string {
  return new Date().toISOString();
}

// ---------------------------------------------------------------------------
// Helpers de resposta A2A
// ---------------------------------------------------------------------------

function createJsonRpcError(id: string | number | null, code: number, message: string, data?: unknown): JsonRpcResponse {
  return { jsonrpc: '2.0', error: { code, message, data }, id };
}

function createJsonRpcResponse(id: string | number | null, result: unknown): JsonRpcResponse {
  return { jsonrpc: '2.0', result, id };
}

/**
 * Cria um Task A2A válido com:
 * - artifacts[0]: part de texto (Markdown legível por humanos)
 * - artifacts[1]: part de dados puros (JSON estruturado)
 */
function createTask(
  requestId: string | number | null,
  contextId: string,
  markdownText: string,
  dataPayload: unknown,
  state: A2ATask['status']['state'] = 'completed'
): A2ATask {
  const taskId = typeof requestId === 'string' ? requestId : `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  return {
    id: taskId,
    contextId,
    status: {
      state,
      timestamp: nowISO(),
    },
    artifacts: [
      {
        artifactId: `${taskId}-text`,
        name: 'Human-readable summary',
        parts: [{ kind: 'text', type: 'text', text: markdownText }],
      },
      {
        artifactId: `${taskId}-data`,
        name: 'Structured data',
        parts: [{ kind: 'data', type: 'data', data: dataPayload }],
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Implementação das 4 Skills
// ---------------------------------------------------------------------------

async function handleListCategories(): Promise<{ markdown: string; data: unknown }> {
  await loadCatalog();
  const result = categories.map((c: Category) => ({
    id: c.id,
    label: c.label,
    count: resources.filter((r: NormalizedResource) => r.category === c.id).length,
  }));
  const markdown = `## Categorias Disponíveis (${categories.length})\n\n` +
    result.map(c => `- **${c.label}** (${c.count} recurso${c.count !== 1 ? 's' : ''})`).join('\n');
  return { markdown, data: result };
}

async function handleFilterByCategory(names: string[]): Promise<{ markdown: string; data: unknown }> {
  await loadCatalog();
  const norm = names.map(normalize);
  const matched = categories.filter((c) => norm.includes(normalize(c.id)) || norm.includes(normalize(c.label)));
  if (matched.length === 0) {
    const available = categories.map(c => c.id).join(', ');
    return { markdown: `❌ Nenhuma categoria correspondente. Disponíveis: ${available}`, data: { error: 'Categoria não encontrada', available } };
  }
  const filtered = resources.filter((r) => matched.some((c) => c.id === r.category));
  const markdown = `## Recursos por Categoria (${filtered.length})\n\n` +
    filtered.map((r) => `- **${r.name}** (${r.category}) - ${r.url}\n  ${r.description}`).join('\n\n');
  return { markdown, data: filtered };
}

async function handleSearchResources(query: string, limit = 20): Promise<{ markdown: string; data: unknown }> {
  await loadCatalog();
  const q = normalize(query);
  if (!q) return { markdown: '❌ Query de busca não fornecida.', data: { error: 'Query vazia' } };
  const results = resources.filter((r) =>
    normalize(r.name).includes(q) || normalize(r.description).includes(q) ||
    r.tags.some((t) => normalize(t).includes(q)) || normalize(r.category).includes(q)
  ).slice(0, limit);
  const markdown = `## Busca: "${query}" (${results.length} de ${resources.length})\n\n` +
    results.map((r) => `- **${r.name}** [${r.category}] - ${r.url}\n  ${r.description}`).join('\n\n');
  return { markdown, data: results };
}

async function handleGetResourceDetails(identifier: string): Promise<{ markdown: string; data: unknown }> {
  await loadCatalog();
  const normId = normalize(identifier);
  const resource = resources.find((r) => normalize(r.id) === normId || normalize(r.name) === normId);
  if (!resource) return { markdown: `❌ Recurso "${identifier}" não encontrado.`, data: { error: 'Não encontrado', identifier } };
  const markdown = `## ${resource.name}\n\n` +
    `**ID:** ${resource.id}\n**URL:** ${resource.url}\n**Categoria:** ${resource.category}\n` +
    `**Tags:** ${resource.tags.join(', ')}\n**Em destaque:** ${resource.featured ? 'Sim' : 'Não'}\n\n` +
    `**Descrição:**\n${resource.description}`;
  return { markdown, data: resource };
}

// ---------------------------------------------------------------------------
// Dispatcher determinístico (sem LLMs)
// ---------------------------------------------------------------------------

async function dispatch(text: string): Promise<{ markdown: string; data: unknown }> {
  const lower = text.trim().toLowerCase();

  // list_categories
  if (
    lower === 'list_categories' ||
    lower.includes('listar categorias') ||
    lower.includes('quais categorias') ||
    lower.includes('categorias disponíveis')
  ) {
    return handleListCategories();
  }

  // filter_by_category
  if (
    lower.startsWith('filter_by_category') ||
    lower.startsWith('filtrar por categoria') ||
    lower.includes('recursos de ') ||
    lower.includes('mostre ') ||
    lower.includes('filtre por ')
  ) {
    let catsText = '';
    if (lower.includes(':')) catsText = text.split(':')[1].trim();
    else if (lower.includes('recursos de ')) catsText = text.slice(text.toLowerCase().indexOf('recursos de ') + 12).trim();
    else if (lower.includes('filtre por ')) catsText = text.slice(text.toLowerCase().indexOf('filtre por ') + 11).trim();
    else if (lower.includes('mostre ')) catsText = text.slice(text.toLowerCase().indexOf('mostre ') + 7).trim();
    const catNames = catsText.split(/[,;]/).map(s => s.trim()).filter(Boolean);
    return handleFilterByCategory(catNames);
  }

  // search_resources
  if (
    lower.startsWith('search_resources') ||
    lower.startsWith('buscar ') ||
    lower.startsWith('busque ') ||
    lower.includes('buscar por ')
  ) {
    let q = '';
    if (lower.includes(':')) q = text.split(':')[1].trim();
    else if (lower.startsWith('buscar ')) q = text.slice(7).trim();
    else if (lower.startsWith('busque ')) q = text.slice(7).trim();
    else if (lower.includes('buscar por ')) q = text.slice(text.toLowerCase().indexOf('buscar por ') + 11).trim();
    return handleSearchResources(q);
  }

  // get_resource_details
  if (
    lower.startsWith('get_resource_details') ||
    lower.startsWith('detalhes do recurso') ||
    lower.startsWith('informações sobre ') ||
    lower.startsWith('url do recurso ')
  ) {
    let id = '';
    if (lower.includes(':')) id = text.split(':')[1].trim();
    else if (lower.startsWith('detalhes do recurso ')) id = text.slice(20).trim();
    else if (lower.startsWith('informações sobre ')) id = text.slice(18).trim();
    else if (lower.startsWith('url do recurso ')) id = text.slice(15).trim();
    return handleGetResourceDetails(id);
  }

  // Fallback: listar categorias
  return handleListCategories();
}

// ---------------------------------------------------------------------------
// Handler principal
// ---------------------------------------------------------------------------

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  // CORS headers PRIMEIRO - antes de qualquer retorno de erro
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // Preflight
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  // Apenas POST
  if (req.method !== 'POST') {
    res.status(405).json(createJsonRpcError(null, ERROR.METHOD_NOT_FOUND, 'Method not allowed. Use POST.'));
    return;
  }

  // Parse JSON body
  let body: JsonRpcRequest;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    res.status(400).json(createJsonRpcError(null, ERROR.PARSE_ERROR, 'Parse error: Invalid JSON'));
    return;
  }

  // Validar JSON-RPC 2.0
  if (!body || body.jsonrpc !== '2.0' || typeof body.method !== 'string') {
    res.status(400).json(createJsonRpcError(body?.id ?? null, ERROR.INVALID_REQUEST, 'Invalid Request: must be JSON-RPC 2.0'));
    return;
  }

  // Validar método A2A
  if (body.method !== 'message/send') {
    res.status(400).json(createJsonRpcError(body.id ?? null, ERROR.METHOD_NOT_FOUND, `Method not found: ${body.method}`));
    return;
  }

  // Extrair params com suporte a kind (A2A) e type (legado)
  const params = body.params as A2AParams | undefined;
  if (!params || !params.message || !Array.isArray(params.message.parts)) {
    res.status(400).json(createJsonRpcError(body.id, ERROR.INVALID_PARAMS, 'Invalid params: message.parts must be an array'));
    return;
  }

  // Aceitar parts com kind === 'text'/'data' OU type === 'text'/'data'
  const textParts = params.message.parts
    .filter((p: A2AMessagePart) => (p.kind === 'text' || p.type === 'text') && typeof p.text === 'string')
    .map((p: A2AMessagePart) => p.text!)
    .join('\n');

  if (!textParts.trim()) {
    res.status(400).json(createJsonRpcError(body.id, ERROR.INVALID_PARAMS, 'Invalid params: message must contain text or data parts'));
    return;
  }

  // Context ID para rastreamento (pode vir do cliente)
  const contextId = params.message.contextId || `ctx-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  try {
    const { markdown, data } = await dispatch(textParts);
    const task = createTask(body.id, contextId, markdown, data, 'completed');
    res.status(200).json(createJsonRpcResponse(body.id, task));
  } catch (err) {
    res.status(500).json(createJsonRpcError(body.id, ERROR.INTERNAL_ERROR, String(err)));
  }
}
