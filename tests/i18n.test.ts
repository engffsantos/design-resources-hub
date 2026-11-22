import { describe, expect, it } from 'vitest';
import { catalogueKeys } from './helpers/i18n-keys';
import { dictionaries, en, interpolate, ptBR } from '../src/locales';

describe('i18n dictionaries', () => {
  it('exposes the same key tree in PT-BR and EN', () => {
    expect(catalogueKeys(ptBR).sort()).toEqual(catalogueKeys(en).sort());
  });

  it('translates the core UI copy instead of duplicating English', () => {
    expect(ptBR.tagline).not.toBe(en.tagline);
    expect(ptBR.searchPlaceholder).not.toBe(en.searchPlaceholder);
    expect(ptBR.unknownPrice).toBe('Não informado');
    expect(en.unknownPrice).toBe('Not specified');
  });

  it('covers every category and track label', () => {
    const ids = [
      'ai-prompts', 'landings', 'components', 'motion', 'micro-interactions', 'typography',
      'ux-flows', 'libraries', 'security', 'agent-skills', 'mcp-protocols', 'agent-infra',
      'icons-assets', 'design-systems', 'agent-templates',
      'design-ui', 'ai-agents', 'dev-tools',
    ];
    for (const id of ids) {
      expect(typeof dictionaries['pt-BR'][id as keyof typeof ptBR]).toBe('string');
      expect(typeof dictionaries.en[id as keyof typeof en]).toBe('string');
    }
  });

  it('interpolates placeholders deterministically', () => {
    expect(interpolate(ptBR.visitResource, { name: 'Strata' })).toBe('Visitar Strata');
    expect(interpolate(en.resourcesCount, { count: 12 })).toBe('12 resources');
    expect(interpolate('{{a}}/{{b}}', { a: 'x' })).toBe('x/{{b}}');
  });
});
