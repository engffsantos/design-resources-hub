import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '@/App';
import {
  catalogResources,
  EDITORIAL_IDS,
  getEditorialResources,
  searchCatalog,
} from '@/lib/catalog';
import { renderWithProviders } from './helpers/render';

const PAGE_SIZE = 24;
const catalogItems = catalogResources.filter((r) => !EDITORIAL_IDS.includes(r.id)).length;
const totalPages = Math.ceil(catalogItems / PAGE_SIZE);

describe('discovery-first interface', () => {
  it('reports the real page range and counts editorial picks separately', () => {
    renderWithProviders(<App />);
    expect(screen.getByText(new RegExp(`exibindo 1–${PAGE_SIZE} de ${catalogItems}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/\+ 9 na seleção editorial/i)).toBeInTheDocument();
    expect(screen.queryByText(/exibindo 353 de 353/i)).not.toBeInTheDocument();
  });

  it('recomputes the range on the last page', () => {
    renderWithProviders(<App />);
    const from = (totalPages - 1) * PAGE_SIZE + 1;
    fireEvent.click(screen.getByRole('button', { name: new RegExp(`página ${totalPages} de ${totalPages}`, 'i') }));
    expect(screen.getByText(new RegExp(`exibindo ${from}–${catalogItems} de ${catalogItems}`, 'i'))).toBeInTheDocument();
    expect(screen.queryByText(/seleção editorial/i)).not.toBeInTheDocument();
  });

  it('uses the filtered list size, not the catalog size, as the range total', async () => {
    renderWithProviders(<App />);
    // Filtering brings the editorial picks back into the single result pool.
    const expected = searchCatalog(catalogResources, { query: 'mcp' }).length;
    expect(expected).toBeGreaterThan(PAGE_SIZE);

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'mcp' } });
    await waitFor(() => expect(
      screen.getByText(new RegExp(`exibindo 1–${PAGE_SIZE} de ${expected}`, 'i')),
    ).toBeInTheDocument());
    expect(screen.queryByText(/na seleção editorial/i)).not.toBeInTheDocument();
  });

  it('keeps the stats strip compact and non-redundant', () => {
    renderWithProviders(<App />);
    expect(screen.getAllByText(String(catalogResources.length)).length).toBeGreaterThan(0);
    expect(screen.queryAllByRole('article')).toHaveLength(getEditorialResources().length + PAGE_SIZE);
  });

  it('turns intents into existing URL filters', async () => {
    renderWithProviders(<App />);
    fireEvent.click(screen.getByRole('button', { name: /biblioteca de componentes/i }));
    await waitFor(() => expect(window.location.search).toContain('category=components'));
    expect(window.location.search).toContain('track=design-ui');
    expect(screen.queryByText('Seleção editorial')).not.toBeInTheDocument();
  });

  it('reveals categories in context and supports an explicit disclosure', () => {
    renderWithProviders(<App />);
    expect(screen.queryByRole('group', { name: /categorias/i })).not.toBeInTheDocument();

    const browse = screen.getByRole('button', { name: /explorar 15 categorias/i });
    expect(browse).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(browse);
    const group = screen.getByRole('group', { name: /categorias/i });
    expect(within(group).getAllByRole('button')).toHaveLength(16);
    expect(browse).toHaveAttribute('aria-expanded', 'true');
  });

  it('narrows the category list to the selected track via keyboard', () => {
    renderWithProviders(<App />);
    const allTab = screen.getByRole('tab', { name: /todos os recursos/i });
    allTab.focus();
    fireEvent.keyDown(allTab, { key: 'ArrowRight' });

    const designTab = screen.getByRole('tab', { name: /Design & UI/i });
    expect(designTab).toHaveAttribute('aria-selected', 'true');
    expect(designTab).toHaveFocus();
    expect(within(screen.getByRole('group', { name: /categorias/i })).getAllByRole('button')).toHaveLength(9);

    fireEvent.keyDown(designTab, { key: 'ArrowRight' });
    const agentTab = screen.getByRole('tab', { name: /IA & Agentes/i });
    expect(agentTab).toHaveAttribute('aria-selected', 'true');
    expect(within(screen.getByRole('group', { name: /categorias/i })).getAllByRole('button')).toHaveLength(6);
  });

  it('keeps advanced filters collapsed until requested', () => {
    renderWithProviders(<App />);
    const toggle = screen.getByRole('button', { name: 'Filtros', exact: true });
    const controls = document.getElementById('filter-controls')!;
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(controls).toHaveClass('hidden');
    fireEvent.click(toggle);
    expect(controls).not.toHaveClass('hidden');
  });

  it('uses decorative previews without fake screenshots', () => {
    const { container } = renderWithProviders(<App />);
    const previews = container.querySelectorAll('[data-preview]');
    expect(previews.length).toBeGreaterThan(0);
    expect(Array.from(previews).every((preview) => preview.getAttribute('aria-hidden') === 'true')).toBe(true);
    expect(container.querySelector('img')).toBeNull();
  });

  it('links the editorial shortlist to the paginated results', () => {
    renderWithProviders(<App />);
    expect(screen.getByRole('link', { name: /ver todos/i })).toHaveAttribute('href', '#catalog-results');
    expect(document.getElementById('catalog-results')).not.toBeNull();
  });

  it('regresses against the canonical 353-resource catalog', () => {
    expect(catalogResources).toHaveLength(353);
    expect(new Set(catalogResources.map((r) => r.id)).size).toBe(353);
    expect(getEditorialResources()).toHaveLength(9);
    expect(catalogItems).toBe(344);
  });
});
