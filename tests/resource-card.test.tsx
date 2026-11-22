import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ResourceCard } from '@/components/ResourceCard';
import { catalogResources } from '@/lib/catalog';
import { renderWithProviders } from './helpers/render';

const unknownPrice = catalogResources.find((r) => r.pricing === null)!;
const declared = catalogResources.find((r) => r.pricing === 'open-source')!;

function renderCard(resource = declared, isFavorite = false) {
  const onToggleFavorite = vi.fn();
  const onOpenDetails = vi.fn();
  renderWithProviders(
    <ResourceCard
      resource={resource}
      index={0}
      isFavorite={isFavorite}
      onToggleFavorite={onToggleFavorite}
      onOpenDetails={onOpenDetails}
    />,
  );
  return { onToggleFavorite, onOpenDetails };
}

describe('ResourceCard', () => {
  it('keeps the visit action visible without hover', () => {
    renderCard();
    const link = screen.getByRole('link', { name: new RegExp(declared.name, 'i') });
    expect(link).toBeVisible();
    expect(link.className).not.toContain('opacity-0');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('exposes an accessible favorite toggle', () => {
    const { onToggleFavorite } = renderCard(declared, true);
    const button = screen.getByRole('button', { name: /remover .* dos favoritos/i });
    expect(button).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(button);
    expect(onToggleFavorite).toHaveBeenCalledWith(declared.id);
  });

  it('reports unknown price without inventing a value', () => {
    renderCard(unknownPrice);
    expect(screen.getByText('Não informado')).toBeInTheDocument();
    expect(screen.queryByText('Gratuito')).not.toBeInTheDocument();
  });

  it('opens the detail modal through an explicit button', () => {
    const { onOpenDetails } = renderCard();
    fireEvent.click(screen.getByRole('button', { name: /ver detalhes de/i }));
    expect(onOpenDetails).toHaveBeenCalledWith(declared);
  });
});
