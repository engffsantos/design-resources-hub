import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '@/App';
import { FilterPanel } from '@/components/FilterPanel';
import { ResourceCard } from '@/components/ResourceCard';
import { I18nProvider, useI18n } from '@/context/I18nContext';
import { DEFAULT_FILTERS } from '@/hooks/useCatalogUrlState';
import { catalogResources, EDITORIAL_IDS, searchCatalog } from '@/lib/catalog';
import { renderWithProviders } from './helpers/render';

const root = process.cwd();
const read = (file: string) => readFileSync(`${root}/${file}`, 'utf-8');
const hash = (file: string) => createHash('sha256').update(read(file)).digest('hex');
const catalogItems = catalogResources.filter((r) => !EDITORIAL_IDS.includes(r.id)).length;
const totalPages = Math.ceil(catalogItems / 24);
const lastPageButton = new RegExp(`página ${totalPages} de ${totalPages}`, 'i');

function parseTokens(block: string): Record<string, [number, number, number]> {
  const tokens: Record<string, [number, number, number]> = {};
  for (const match of block.matchAll(/--color-([\w-]+):\s*(\d+)\s+(\d+)\s+(\d+);/g)) {
    tokens[match[1]] = [Number(match[2]), Number(match[3]), Number(match[4])];
  }
  return tokens;
}

function luminance([r, g, b]: [number, number, number]): number {
  const channel = (value: number) => {
    const scaled = value / 255;
    return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(a: [number, number, number], b: [number, number, number]): number {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

function LocaleToggle() {
  const { locale, setLocale } = useI18n();
  return (
    <button type="button" onClick={() => setLocale(locale === 'pt-BR' ? 'en' : 'pt-BR')}>
      toggle-locale
    </button>
  );
}

describe('second-pass regressions', () => {
  it('supports the combined free and open-source price filter', () => {
    const results = searchCatalog(catalogResources, { pricing: 'free-open-source' });
    expect(results).toHaveLength(catalogResources.filter((r) => r.pricing === 'free' || r.pricing === 'open-source').length);
    expect(results.every((r) => r.pricing === 'free' || r.pricing === 'open-source')).toBe(true);
  });

  it('renders 24 catalog items per page without duplicating editorial resources', () => {
    renderWithProviders(<App />);
    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(EDITORIAL_IDS.length + Math.min(24, catalogItems));
    const labels = articles.map((article) => article.getAttribute('aria-labelledby'));
    expect(new Set(labels).size).toBe(labels.length);
    expect(labels.filter((label) => EDITORIAL_IDS.some((id) => label === `resource-title-${id}`))).toHaveLength(EDITORIAL_IDS.length);
    expect(screen.getByRole('button', { name: lastPageButton })).toBeInTheDocument();
  });

  it('translates the hero title and keeps the language in the URL', async () => {
    const pt = renderWithProviders(<App />, { locale: 'pt-BR' });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Índice de Design');
    pt.unmount();

    renderWithProviders(<App />, { locale: 'en' });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Design & Agent Index');
  });

  it('reads ?lang= on startup and preserves other query parameters when it changes', async () => {
    window.history.replaceState({}, '', '/?q=react&lang=en');
    window.localStorage.removeItem('strata-locale');
    render(<I18nProvider><LocaleToggle /></I18nProvider>);
    expect(document.documentElement.lang).toBe('en');
    fireEvent.click(screen.getByRole('button', { name: 'toggle-locale' }));
    await waitFor(() => expect(window.location.search).toContain('lang=pt-BR'));
    expect(window.location.search).toContain('q=react');
    window.history.replaceState({}, '', '/');
  });

  it('shows declared whenToUse, stack and agent-ready state on cards', () => {
    const lucide = catalogResources.find((r) => r.id === 'lucide')!;
    expect(lucide.whenToUse).toBeTruthy();
    expect(lucide.stack?.length).toBeGreaterThan(0);
    renderWithProviders(
      <ResourceCard
        resource={lucide}
        index={0}
        isFavorite={false}
        onToggleFavorite={() => undefined}
        onOpenDetails={() => undefined}
      />,
    );
    expect(screen.getByText('Quando usar')).toBeInTheDocument();
    expect(screen.getByText('Stack')).toBeInTheDocument();
    expect(screen.getByText('Pronto para agentes')).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
  });

  it('offers a combined price option and a mobile filter disclosure', () => {
    renderWithProviders(
      <FilterPanel
        filters={DEFAULT_FILTERS}
        resourceTypes={['component-library']}
        favoritesCount={0}
        onChange={() => undefined}
        onReset={() => undefined}
      />,
    );
    expect(screen.getByRole('option', { name: /grátis\s*&\s*open source/i })).toBeInTheDocument();
    const toggle = screen.getByRole('button', { name: 'Filtros', exact: true });
    const controls = document.getElementById('filter-controls')!;
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(controls).toHaveClass('hidden');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveAttribute('aria-controls', 'filter-controls');
    expect(controls).not.toHaveClass('hidden');
  });

  it('exposes active filters as individually removable chips', async () => {
    renderWithProviders(<App />);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'free-mcp' } });
    await waitFor(() => expect(window.location.search).toContain('q=free-mcp'));
    const chip = screen.getByRole('button', { name: /remover filtro buscar recursos: free-mcp/i });
    fireEvent.click(chip);
    await waitFor(() => expect(window.location.search).toBe(''));
    expect(screen.getAllByRole('article')).toHaveLength(33);
  });

  it('keeps control boundaries at 3:1 or better in both themes', () => {
    const css = read('src/styles/globals.css');
    const light = parseTokens(css.match(/:root\s*{([^}]*)}/)![1]);
    const dark = parseTokens(css.match(/\.dark\s*{([^}]*)}/)![1]);
    expect(contrast(light.border, light.card)).toBeGreaterThanOrEqual(3);
    expect(contrast(light.input, light.background)).toBeGreaterThanOrEqual(3);
    expect(contrast(dark.border, dark.card)).toBeGreaterThanOrEqual(3);
    expect(contrast(dark.input, dark.background)).toBeGreaterThanOrEqual(3);
  });

  it('emits byte-identical artifacts on repeated builds', () => {
    execFileSync('npx', ['tsx', 'scripts/generate-agent-layer.ts'], { cwd: root, stdio: 'pipe' });
    const files = ['public/catalog.json', 'public/llms-full.txt', 'index.html'];
    const before = files.map(hash);
    execFileSync('npx', ['tsx', 'scripts/generate-agent-layer.ts'], { cwd: root, stdio: 'pipe' });
    expect(files.map(hash)).toEqual(before);
  });
});
