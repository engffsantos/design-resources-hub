'use client';

import { useId } from 'react';
import type { CatalogFilters } from '@/hooks/useCatalogUrlState';
import { isPricing, type Pricing, type SortId } from '@/lib/catalog';
import { useI18n } from '@/context/I18nContext';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
  filters: CatalogFilters;
  resourceTypes: string[];
  favoritesCount: number;
  onChange: (patch: Partial<CatalogFilters>) => void;
  onReset: () => void;
}

const selectClass = 'h-9 rounded-md border border-input bg-card px-2 text-sm text-foreground';

export function FilterPanel({ filters, resourceTypes, favoritesCount, onChange, onReset }: FilterPanelProps) {
  const { t } = useI18n();
  const priceId = useId();
  const typeId = useId();
  const sortId = useId();
  const agentId = useId();
  const favoritesId = useId();

  const priceOptions: Array<Pricing | ''> = ['', 'open-source', 'free', 'freemium', 'paid'];
  const sortOptions: SortId[] = ['relevance', 'featured', 'az', 'opensource'];

  const priceLabel = (price: Pricing | '') => {
    if (price === '') return t.allPrices;
    if (price === 'open-source') return t.openSource;
    if (price === 'free') return t.free;
    if (price === 'freemium') return t.freemium;
    return t.paid;
  };

  const sortLabel = (sort: SortId) => {
    if (sort === 'relevance') return t.sortRelevance;
    if (sort === 'featured') return t.sortFeatured;
    if (sort === 'az') return t.sortAZ;
    return t.sortOpenSource;
  };

  return (
    <section aria-labelledby="filters-heading" className="rounded-xl border border-border bg-card/50 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 id="filters-heading" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t.filtersTitle}
        </h2>
        <button type="button" onClick={onReset} className="rounded text-sm text-primary hover:underline">
          {t.clearAllFilters}
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label className="mb-1 block text-xs text-muted-foreground" htmlFor={priceId}>{t.price}</label>
          <select
            id={priceId}
            className={selectClass}
            value={filters.pricing}
            onChange={(event) => {
              const value = event.target.value;
              onChange({ pricing: isPricing(value) ? value : '' });
            }}
          >
            {priceOptions.map((price) => (
              <option key={price || 'all'} value={price}>{priceLabel(price)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs text-muted-foreground" htmlFor={typeId}>{t.type}</label>
          <select
            id={typeId}
            className={selectClass}
            value={filters.type}
            onChange={(event) => onChange({ type: event.target.value })}
          >
            <option value="">{t.allTypes}</option>
            {resourceTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs text-muted-foreground" htmlFor={sortId}>{t.sort}</label>
          <select
            id={sortId}
            className={selectClass}
            value={filters.sort}
            onChange={(event) => onChange({ sort: event.target.value as SortId })}
          >
            {sortOptions.map((sort) => (
              <option key={sort} value={sort}>{sortLabel(sort)}</option>
            ))}
          </select>
        </div>

        <label htmlFor={agentId} className="flex items-center gap-2 self-end text-sm text-muted-foreground">
          <input
            id={agentId}
            type="checkbox"
            checked={filters.agentReady}
            onChange={(event) => onChange({ agentReady: event.target.checked })}
            className="h-4 w-4 rounded border-input accent-primary"
          />
          {t.agentReadyOnly}
        </label>

        <label htmlFor={favoritesId} className="flex items-center gap-2 self-end text-sm text-muted-foreground">
          <input
            id={favoritesId}
            type="checkbox"
            checked={filters.favoritesOnly}
            onChange={(event) => onChange({ favoritesOnly: event.target.checked })}
            className="h-4 w-4 rounded border-input accent-primary"
          />
          {t.favoritesOnly} ({favoritesCount})
        </label>
      </div>

      <p className={cn('mt-3 text-xs text-muted-foreground')}>{t.metadataNote}</p>
    </section>
  );
}
