import { describe, expect, it } from 'vitest';
import { resources as rawResources } from '../src/data/resources';
import {
  catalogCategories,
  catalogResources,
  computeStats,
  EDITORIAL_IDS,
  getEditorialResources,
  normalizeText,
  searchCatalog,
  TRACKS,
} from '../src/lib/catalog';

describe('canonical catalog', () => {
  it('preserves catalog identity, all 15 categories and 3 tracks', () => {
    const stats = computeStats();
    const ids = catalogResources.map((r) => r.id);
    expect(catalogResources).toHaveLength(rawResources.length);
    expect(new Set(ids).size).toBe(ids.length);
    expect(catalogCategories).toHaveLength(15);
    expect(TRACKS).toHaveLength(3);
    expect(stats.total).toBe(rawResources.length);
    expect(stats.categories).toBe(15);
    expect(stats.byTrack['design-ui'] + stats.byTrack['ai-agents'] + stats.byTrack['dev-tools']).toBe(rawResources.length);

    // P0 regression: IDs and categories lost during the 2026-11-22 uncatalogued expansion.
    const protectedIds = [
      'arcjet', 'better-auth', 'gitleaks', 'mobbin', 'oxc', 'refero-design', 'semgrep',
      'aider', 'biome-tool', 'stagehand', 'langfuse-tool', 'openhands',
      'vercel-ai-sdk', 'mastra', 'langgraph', 'pydantic-ai', 'promptfoo', 'e2b-sandboxes',
    ];
    expect(protectedIds.every((id) => ids.includes(id))).toBe(true);
    expect(stats.byCategory['agent-infra']).toBeGreaterThan(0);
    expect(catalogResources.filter((r) => !catalogCategories.some((c) => c.id === r.category))).toHaveLength(0);
  });

  it('does not invent metadata for unknown values', () => {
    const stats = computeStats();
    const unknownFromSource = rawResources.filter((r) => !r.pricing).length;
    expect(stats.unknownPricing).toBe(unknownFromSource);
    expect(catalogResources.filter((r) => r.pricing === null)).toHaveLength(unknownFromSource);
    expect(catalogResources.some((r) => r.stack?.join(',') === 'design,engineering')).toBe(false);
    expect(catalogResources.some((r) => r.whenToUse?.includes('Curated '))).toBe(false);
    for (const resource of catalogResources) {
      expect(resource.provenance.pricing === 'declared').toBe(resource.pricing !== null);
      if (!resource.whenToUse) expect(resource.provenance.whenToUse).toBe('unknown');
      if (!resource.stack) expect(resource.provenance.stack).toBe('unknown');
    }
  });

  it('keeps declared pricing distribution consistent with declared metadata', () => {
    const stats = computeStats();
    const declared = catalogResources.filter((r) => r.pricing !== null);
    for (const pricing of ['open-source', 'free', 'freemium', 'paid']) {
      expect(stats.byPricing[pricing] ?? 0).toBe(declared.filter((r) => r.pricing === pricing).length);
    }
    expect(stats.byPricing.unknown).toBe(catalogResources.length - declared.length);
    expect(stats.byPricing.paid).toBeUndefined();
    expect(Object.values(stats.byPricing).reduce((sum, n) => sum + n, 0)).toBe(catalogResources.length);
  });

  it('uses only real IDs for the editorial shortlist', () => {
    const ids = new Set(catalogResources.map((resource) => resource.id));
    expect(EDITORIAL_IDS).toHaveLength(9);
    expect(EDITORIAL_IDS.every((id) => ids.has(id))).toBe(true);
    expect(getEditorialResources()).toHaveLength(9);
  });

  it('normalizes accents and synonyms in deterministic search', () => {
    expect(normalizeText('Acessibilidade')).toBe('acessibilidade');
    expect(searchCatalog(catalogResources, { query: 'icones' }).length).toBeGreaterThan(0);
    expect(searchCatalog(catalogResources, { query: 'gratis', limit: 5 })).toHaveLength(5);
    const exact = searchCatalog(catalogResources, { query: 'mcp reference servers', limit: 5 });
    expect(exact[0].name.toLowerCase()).toContain('mcp');
  });

  it('applies filters and sorting without mutating the catalog', () => {
    const frozen = catalogResources.map((r) => r.id).join('|');
    const filtered = searchCatalog(catalogResources, {
      track: 'ai-agents',
      pricing: 'open-source',
      agentReady: true,
      sort: 'az',
      limit: 10,
    });
    expect(filtered).toHaveLength(10);
    expect(filtered.every((r) => r.track === 'ai-agents' && r.pricing === 'open-source' && r.agentConsumable === true)).toBe(true);
    expect(filtered.map((r) => r.name)).toEqual([...filtered.map((r) => r.name)].sort((a, b) => a.localeCompare(b)));
    expect(catalogResources.map((r) => r.id).join('|')).toBe(frozen);
  });
});
