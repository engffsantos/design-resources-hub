import { describe, expect, it } from 'vitest';
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
  it('preserves all 219 resources, 15 categories and 3 tracks', () => {
    const stats = computeStats();
    expect(catalogResources).toHaveLength(219);
    expect(catalogCategories).toHaveLength(15);
    expect(TRACKS).toHaveLength(3);
    expect(stats.total).toBe(219);
    expect(stats.categories).toBe(15);
    expect(stats.byTrack['design-ui'] + stats.byTrack['ai-agents'] + stats.byTrack['dev-tools']).toBe(219);
  });

  it('does not invent metadata for unknown values', () => {
    const stats = computeStats();
    expect(stats.unknownPricing).toBe(85);
    expect(catalogResources.filter((r) => r.pricing === null)).toHaveLength(85);
    expect(catalogResources.some((r) => r.stack?.join(',') === 'design,engineering')).toBe(false);
    expect(catalogResources.some((r) => r.whenToUse?.includes('Curated '))).toBe(false);
    for (const resource of catalogResources) {
      expect(resource.provenance.pricing === 'declared').toBe(resource.pricing !== null);
      if (!resource.whenToUse) expect(resource.provenance.whenToUse).toBe('unknown');
      if (!resource.stack) expect(resource.provenance.stack).toBe('unknown');
    }
  });

  it('keeps declared pricing distribution stable', () => {
    const stats = computeStats();
    expect(stats.byPricing).toMatchObject({
      'open-source': 110,
      free: 9,
      freemium: 15,
      unknown: 85,
    });
    expect(stats.byPricing.paid).toBeUndefined();
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
