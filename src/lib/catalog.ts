/**
 * Canonical catalog transformation layer.
 * Single source of truth shared by the React UI, the build-time generator and
 * the A2A serverless function. Unknown metadata stays unknown: no commercial
 * or technical facts are fabricated here.
 */
import {
  resources as rawResources,
  categories as rawCategories,
  type Category,
  type Resource,
} from '../data/resources.js';

export type TrackId = 'design-ui' | 'ai-agents' | 'dev-tools';
export type Pricing = 'open-source' | 'free' | 'freemium' | 'paid';
/** UI-only compound filter: resources whose price is explicitly free or open source. */
export type PricingFilter = Pricing | 'free-open-source';
export type PricingValue = Pricing | null;
export type SortId = 'relevance' | 'featured' | 'az' | 'opensource';

export interface Track {
  id: TrackId;
  label: string;
  description: string;
  categoryIds: Category[];
}

export const TRACKS: Track[] = [
  {
    id: 'design-ui',
    label: 'Design & UI',
    description: 'Interfaces, motion, typography, icons and design systems.',
    categoryIds: ['landings', 'components', 'motion', 'micro-interactions', 'typography', 'ux-flows', 'icons-assets', 'design-systems'],
  },
  {
    id: 'ai-agents',
    label: 'IA & Agentes',
    description: 'Agent skills, prompts, MCP servers, SDKs and starter templates.',
    categoryIds: ['agent-skills', 'ai-prompts', 'mcp-protocols', 'agent-infra', 'agent-templates'],
  },
  {
    id: 'dev-tools',
    label: 'Dev Tools & Segurança',
    description: 'Libraries, developer utilities and security tooling.',
    categoryIds: ['libraries', 'security'],
  },
];

export const TRACK_BY_CATEGORY = Object.freeze(
  TRACKS.reduce<Record<string, TrackId>>((acc, track) => {
    for (const id of track.categoryIds) acc[id] = track.id;
    return acc;
  }, {}),
);

export const CATEGORY_BY_ID = Object.freeze(
  rawCategories.reduce<Record<string, { id: string; label: string; icon: string; description: string }>>((acc, c) => {
    acc[c.id] = c;
    return acc;
  }, {}),
);

/** Provenance is explicit so consumers can distinguish declared from derived data. */
export interface MetadataProvenance {
  pricing: 'declared' | 'unknown';
  whenToUse: 'declared' | 'unknown';
  stack: 'declared' | 'unknown';
  resourceType: 'declared' | 'unknown';
  repoUrl: 'declared' | 'derived-from-url' | 'unknown';
  agentConsumable: 'declared' | 'unknown';
}

export interface CatalogResource {
  id: string;
  name: string;
  url: string;
  description: string;
  category: Category;
  categoryLabel: string;
  track: TrackId;
  tags: string[];
  featured: boolean;
  resourceType?: string;
  whenToUse?: string;
  stack?: string[];
  pricing: PricingValue;
  agentConsumable?: boolean;
  repoUrl?: string;
  provenance: MetadataProvenance;
}

const PRICING_VALUES: Pricing[] = ['open-source', 'free', 'freemium', 'paid'];

export function isPricing(value: unknown): value is Pricing {
  return typeof value === 'string' && (PRICING_VALUES as string[]).includes(value);
}

export function isPricingFilter(value: unknown): value is PricingFilter {
  return isPricing(value) || value === 'free-open-source';
}

/** Some upstream catalogs wrap links in Markdown; unwrap without altering the target. */
function unwrapUrl(value: string): string {
  const trimmed = value.trim();
  const markdown = trimmed.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  return (markdown ? markdown[2] : trimmed).trim();
}

/** Derived only from an explicit GitHub repository URL, never from a category. */
function deriveRepoUrl(url: string): string | undefined {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.toLowerCase() !== 'github.com') return undefined;
    const segments = parsed.pathname.split('/').filter(Boolean);
    if (segments.length < 2) return undefined;
    return `https://github.com/${segments[0]}/${segments[1]}`;
  } catch {
    return undefined;
  }
}

export function normalizeCatalogResource(raw: Resource): CatalogResource {
  const categoryLabel = CATEGORY_BY_ID[raw.category]?.label ?? raw.category;
  const url = unwrapUrl(raw.url);
  const explicitRepo = raw.repoUrl ? unwrapUrl(raw.repoUrl) : undefined;
  const derivedRepo = deriveRepoUrl(url);
  const repoUrl = explicitRepo || derivedRepo;
  return {
    id: raw.id,
    name: raw.name,
    url,
    description: raw.description,
    category: raw.category,
    categoryLabel,
    track: TRACK_BY_CATEGORY[raw.category] ?? 'dev-tools',
    tags: [...(raw.tags ?? [])],
    featured: raw.featured === true,
    ...(raw.resourceType ? { resourceType: raw.resourceType } : {}),
    ...(raw.whenToUse ? { whenToUse: raw.whenToUse } : {}),
    ...(raw.stack?.length ? { stack: [...raw.stack] } : {}),
    pricing: isPricing(raw.pricing) ? raw.pricing : null,
    ...(raw.agentConsumable !== undefined ? { agentConsumable: raw.agentConsumable } : {}),
    ...(repoUrl ? { repoUrl } : {}),
    provenance: {
      pricing: isPricing(raw.pricing) ? 'declared' : 'unknown',
      whenToUse: raw.whenToUse ? 'declared' : 'unknown',
      stack: raw.stack?.length ? 'declared' : 'unknown',
      resourceType: raw.resourceType ? 'declared' : 'unknown',
      repoUrl: explicitRepo ? 'declared' : derivedRepo ? 'derived-from-url' : 'unknown',
      agentConsumable: raw.agentConsumable !== undefined ? 'declared' : 'unknown',
    },
  };
}

/** Canonical normalized catalog. Never mutate in place. */
export const catalogResources: CatalogResource[] = rawResources.map(normalizeCatalogResource);
export const catalogCategories = rawCategories.map((c) => ({ ...c }));

/** Explicit editorial selection for the home page (legacy `featured` flags are preserved in data). */
export const EDITORIAL_IDS: string[] = [
  // Design & UI (3)
  'land-book',
  'component-gallery',
  'fontshare',
  // IA & Agentes (3)
  'vercel-ai-chatbot',
  'mcp-reference-servers',
  'skills-agent-ui',
  // Dev Tools & Segurança (3)
  'libraries-dev',
  'remotion',
  'vibe-shield',
];

export function getEditorialResources(items: CatalogResource[] = catalogResources): CatalogResource[] {
  const byId = new Map(items.map((r) => [r.id, r]));
  return EDITORIAL_IDS.map((id) => byId.get(id)).filter((r): r is CatalogResource => Boolean(r));
}

// ---------------------------------------------------------------------------
// Deterministic weighted search
// ---------------------------------------------------------------------------

export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s-]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Known equivalent terms, applied to whole normalized tokens. */
export const SEARCH_SYNONYMS: Record<string, string[]> = {
  react: ['reactjs', 'react js'],
  tailwind: ['tailwindcss', 'tailwind css'],
  a11y: ['accessibility', 'acessibilidade'],
  icones: ['icons', 'icon', 'icone'],
  gratis: ['free', 'gratuito', 'gratuita'],
  'open source': ['open-source', 'opensource', 'codigo aberto'],
  template: ['templates', 'starter', 'boilerplate', 'modelo'],
  pesquisa: ['research', 'deep-research'],
  seguranca: ['security', 'auth'],
};

export interface SearchOptions {
  query?: string;
  track?: TrackId;
  category?: Category;
  pricing?: PricingFilter;
  type?: string;
  agentReady?: boolean;
  favoritesOnly?: boolean;
  favoriteIds?: ReadonlySet<string>;
  sort?: SortId;
  limit?: number;
}

const WEIGHTS = {
  nameExact: 100,
  namePrefix: 60,
  nameContains: 40,
  tagExact: 30,
  tagContains: 20,
  stackExact: 18,
  stackContains: 12,
  purpose: 10,
  category: 8,
  description: 5,
  metadata: 4,
} as const;

function expandTerm(term: string): string[] {
  return [term, ...(SEARCH_SYNONYMS[term] ?? [])];
}

function fieldScore(haystacks: string[], term: string, exact: number, partial: number): number {
  let best = 0;
  for (const raw of haystacks) {
    const value = normalizeText(raw);
    if (!value) continue;
    if (value === term) best = Math.max(best, exact);
    else if (value.startsWith(`${term} `)) best = Math.max(best, Math.round(exact * 0.7));
    else if (value.includes(term)) best = Math.max(best, partial);
  }
  return best;
}

export function scoreResource(resource: CatalogResource, query: string): number {
  const terms = normalizeText(query).split(' ').filter(Boolean);
  if (terms.length === 0) return 0;
  let total = 0;
  for (const term of terms) {
    const variants = expandTerm(term);
    let termScore = 0;
    for (const variant of variants) {
      termScore = Math.max(
        termScore,
        fieldScore([resource.name], variant, WEIGHTS.nameExact, WEIGHTS.nameContains),
        fieldScore(resource.tags, variant, WEIGHTS.tagExact, WEIGHTS.tagContains),
        fieldScore(resource.stack ?? [], variant, WEIGHTS.stackExact, WEIGHTS.stackContains),
        fieldScore([resource.whenToUse ?? ''], variant, 0, WEIGHTS.purpose),
        fieldScore([resource.category, resource.categoryLabel], variant, 0, WEIGHTS.category),
        fieldScore([resource.description], variant, 0, WEIGHTS.description),
        fieldScore([resource.resourceType ?? '', resource.pricing ?? '', resource.id], variant, WEIGHTS.metadata, WEIGHTS.metadata),
      );
    }
    if (termScore === 0) return 0; // all terms must match (AND)
    total += termScore;
  }
  return total;
}

function compareResources(a: CatalogResource, b: CatalogResource, sort: SortId, query: string): number {
  switch (sort) {
    case 'featured':
      return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name);
    case 'az':
      return a.name.localeCompare(b.name);
    case 'opensource':
      return Number(b.pricing === 'open-source') - Number(a.pricing === 'open-source') || a.name.localeCompare(b.name);
    case 'relevance':
    default: {
      if (!query) return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name);
      return scoreResource(b, query) - scoreResource(a, query) || a.name.localeCompare(b.name);
    }
  }
}

export function searchCatalog(items: CatalogResource[], options: SearchOptions = {}): CatalogResource[] {
  const {
    query = '', track, category, pricing, type, agentReady, favoritesOnly,
    favoriteIds, sort = 'relevance', limit,
  } = options;
  let result = items.filter((r) => {
    if (track && r.track !== track) return false;
    if (category && r.category !== category) return false;
    if (pricing === 'free-open-source') {
      if (r.pricing !== 'free' && r.pricing !== 'open-source') return false;
    } else if (pricing && r.pricing !== pricing) return false;
    if (type && r.resourceType !== type) return false;
    if (agentReady === true && r.agentConsumable !== true) return false;
    if (favoritesOnly && !favoriteIds?.has(r.id)) return false;
    if (query.trim() && scoreResource(r, query) === 0) return false;
    return true;
  });
  result = [...result].sort((a, b) => compareResources(a, b, sort, query));
  return typeof limit === 'number' && limit > 0 ? result.slice(0, limit) : result;
}

export interface CatalogStats {
  total: number;
  categories: number;
  tracks: number;
  featured: number;
  byTrack: Record<TrackId, number>;
  byCategory: Record<string, number>;
  byPricing: Record<string, number>;
  agentReady: number;
  unknownPricing: number;
  metadataCoverage: Record<string, number>;
}

export function computeStats(items: CatalogResource[] = catalogResources): CatalogStats {
  const byTrack = { 'design-ui': 0, 'ai-agents': 0, 'dev-tools': 0 } as Record<TrackId, number>;
  const byCategory: Record<string, number> = {};
  const byPricing: Record<string, number> = { unknown: 0 };
  const coverage: Record<string, number> = {
    whenToUse: 0, stack: 0, resourceType: 0, repoUrl: 0, agentConsumable: 0, pricing: 0,
  };
  for (const r of items) {
    byTrack[r.track] += 1;
    byCategory[r.category] = (byCategory[r.category] ?? 0) + 1;
    const key = r.pricing ?? 'unknown';
    byPricing[key] = (byPricing[key] ?? 0) + 1;
    if (r.whenToUse) coverage.whenToUse += 1;
    if (r.stack) coverage.stack += 1;
    if (r.resourceType) coverage.resourceType += 1;
    if (r.repoUrl) coverage.repoUrl += 1;
    if (r.agentConsumable !== undefined) coverage.agentConsumable += 1;
    if (r.pricing) coverage.pricing += 1;
  }
  return {
    total: items.length,
    categories: new Set(items.map((r) => r.category)).size,
    tracks: TRACKS.length,
    featured: items.filter((r) => r.featured).length,
    byTrack,
    byCategory,
    byPricing,
    agentReady: items.filter((r) => r.agentConsumable === true).length,
    unknownPricing: byPricing.unknown,
    metadataCoverage: coverage,
  };
}
