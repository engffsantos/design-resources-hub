import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '@/App';
import { renderWithProviders } from './helpers/render';

describe('Strata App', () => {
  it('renders the editorial shortlist plus a paginated catalog', () => {
    renderWithProviders(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Strata');
    expect(screen.getByText('Seleção editorial')).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(21); // 9 editorial + 12 first page
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'track-tab-all');
    expect(screen.getByRole('button', { name: /página 19 de 19/i })).toBeInTheDocument();
  });

  it('keeps search state shareable in the URL', async () => {
    renderWithProviders(<App />);
    const searchbox = screen.getByRole('searchbox');

    fireEvent.change(searchbox, { target: { value: 'free-mcp' } });
    await waitFor(() => expect(window.location.search).toContain('q=free-mcp'));
    await waitFor(() => expect(screen.getAllByRole('article').length).toBeGreaterThan(0));

    fireEvent.click(screen.getByRole('button', { name: /limpar filtros/i }));
    await waitFor(() => expect(window.location.search).toBe(''));
  });

  it('switches tracks, narrows categories and resets pagination', () => {
    renderWithProviders(<App />);
    fireEvent.click(screen.getByRole('button', { name: /página 2 de 19/i }));
    expect(window.location.search).toContain('page=2');

    fireEvent.click(screen.getByRole('tab', { name: /IA & Agentes/i }));
    expect(window.location.search).toContain('track=ai-agents');
    expect(window.location.search).not.toContain('page=');
    const group = screen.getByRole('group', { name: /categorias/i });
    expect(within(group).getAllByRole('button')).toHaveLength(6); // All + 5 AI categories
  });

  it('filters by favorites without losing the resource set', async () => {
    renderWithProviders(<App />);
    const favoriteButtons = screen.getAllByRole('button', { name: /adicionar .* aos favoritos/i });
    fireEvent.click(favoriteButtons[0]);

    const favoritesCheckbox = screen.getByLabelText(/só favoritos/i);
    fireEvent.click(favoritesCheckbox);

    await waitFor(() => expect(window.location.search).toContain('favorites=1'));
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.queryByText('Seleção editorial')).not.toBeInTheDocument();
  });

  it('opens a modal from a card and closes it with the keyboard', async () => {
    renderWithProviders(<App />);
    fireEvent.click(screen.getAllByRole('button', { name: /ver detalhes de/i })[0]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});
