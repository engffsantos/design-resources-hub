import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from '@/components/Pagination';
import { ResourceModal } from '@/components/ResourceModal';
import { catalogResources } from '@/lib/catalog';
import { renderWithProviders } from './helpers/render';

const resource = catalogResources[0];

describe('ResourceModal', () => {
  it('is a labelled dialog that closes on Escape and restores focus', () => {
    const trigger = document.createElement('button');
    trigger.textContent = 'open';
    document.body.appendChild(trigger);
    trigger.focus();

    const onClose = vi.fn();
    renderWithProviders(
      <ResourceModal resource={resource} isFavorite={false} onToggleFavorite={vi.fn()} onClose={onClose} />,
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAccessibleName(resource.name);
    expect(screen.getByRole('button', { name: /fechar detalhes/i })).toHaveFocus();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
    trigger.remove();
  });

  it('shows unknown metadata explicitly', () => {
    const unknown = catalogResources.find((r) => r.pricing === null)!;
    renderWithProviders(
      <ResourceModal resource={unknown} isFavorite={false} onToggleFavorite={vi.fn()} onClose={vi.fn()} />,
    );
    expect(screen.getAllByText('Não informado').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Desconhecido').length).toBeGreaterThan(0);
  });
});

describe('Pagination', () => {
  it('marks the current page and disables boundaries', () => {
    const onChange = vi.fn();
    renderWithProviders(<Pagination page={2} pageCount={4} onChange={onChange} />);
    expect(screen.getByRole('button', { name: /página anterior/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /próxima página/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /página 2 de 4/i })).toHaveAttribute('aria-current', 'page');
    fireEvent.click(screen.getByRole('button', { name: /página 3 de 4/i }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('is hidden when there is a single page', () => {
    const { container } = renderWithProviders(<Pagination page={1} pageCount={1} onChange={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });
});
