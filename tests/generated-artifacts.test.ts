import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { catalogCategories, catalogResources, computeStats, TRACKS } from '../src/lib/catalog';

const root = process.cwd();
const read = (relative: string) => readFileSync(path.join(root, relative), 'utf-8');

interface CatalogArtifact {
  resources: Array<{
    id: string;
    pricing: string | null;
    provenance?: { pricing: string };
  }>;
  categories: unknown[];
  tracks: unknown[];
  stats: { unknownPricing: number };
  metadataPolicy: { forbiddenFallbacks: string[] };
}

describe('generated discovery artifacts', () => {
  const catalog = JSON.parse(read('public/catalog.json')) as CatalogArtifact;

  it('is generated from the canonical catalog without losing IDs', () => {
    const canonicalIds = catalogResources.map((r) => r.id);
    expect(catalog.resources.map((r) => r.id)).toEqual(canonicalIds);
    expect(catalog.categories).toHaveLength(catalogCategories.length);
    expect(catalog.tracks).toHaveLength(TRACKS.length);
    expect(catalog.stats.unknownPricing).toBe(computeStats().unknownPricing);
    expect(catalog.resources.filter((r) => r.pricing === null)).toHaveLength(computeStats().unknownPricing);
  });

  it('does not leak invented pricing or generic metadata', () => {
    const raw = read('public/catalog.json');
    expect(catalog.resources.some((r) => r.provenance?.pricing === 'declared' && r.pricing === null)).toBe(false);
    expect(raw).not.toContain('"whenToUse": "Curated ');
    expect(raw).not.toContain('"design,engineering"');
    expect(catalog.metadataPolicy.forbiddenFallbacks).toContain('category-based pricing');
    expect(catalog.resources.filter((r) => r.pricing === null)).toHaveLength(computeStats().unknownPricing);
    expect(catalog.resources.every((r) => r.provenance?.pricing === (r.pricing ? 'declared' : 'unknown'))).toBe(true);
  });

  it('publishes consistent agent cards', () => {
    const card = JSON.parse(read('public/.well-known/agent.json')) as { skills: Array<{ id: string }>; url: string };
    const alias = JSON.parse(read('public/.well-known/agent-card.json')) as typeof card;
    expect(alias).toEqual(card);
    expect(card.skills.map((skill) => skill.id)).toEqual([
      'list_categories', 'filter_by_category', 'search_resources', 'get_resource_details',
    ]);
    expect(card.url).toContain('/api/a2a');
  });

  it('uses the human search route in JSON-LD, not the POST-only A2A endpoint', () => {
    const html = read('index.html');
    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(match).not.toBeNull();
    const jsonLd = JSON.parse(match![1]) as {
      potentialAction: { target: { urlTemplate: string } };
    };
    expect(jsonLd.potentialAction.target.urlTemplate).toContain('/?q={search_term_string}');
    expect(jsonLd.potentialAction.target.urlTemplate).not.toContain('/api/a2a');
    expect(html).toContain('<!-- AGENT-NOSCRIPT:START -->');
  });

  it('documents the provenance policy in llms.txt', () => {
    const text = read('public/llms.txt');
    expect(text).toContain(`Unknown pricing: ${computeStats().unknownPricing} resources`);
    expect(text).toContain('never inferred from category');
    expect(text).toContain('search_resources: free-mcp');
  });
});
