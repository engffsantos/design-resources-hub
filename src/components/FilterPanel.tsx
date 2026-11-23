'use client';

import { SlidersHorizontal } from 'lucide-react';
import { useId, useState } from 'react';
import type { CatalogFilters } from '@/hooks/useCatalogUrlState';
import { isPricingFilter, type PricingFilter, type SortId } from '@/lib/catalog';
import { useI18n } from '@/context/I18nContext';
import { cn } from '@/lib/utils';
import { interpolate } from '@/locales';

interface FilterPanelProps {
  filters: CatalogFilters;
  resourceTypes: string[];
  favoritesCount: number;
  onChange: (patch: Partial<CatalogFilters>) => void;
  onReset: () => void;
}

const selectClass = 'h-10 rounded-md border border-input bg-card px-2 text-sm text-foreground';

export function FilterPanel({ filters, resourceTypes, favoritesCount, onChange, onReset }: FilterPanelProps) {
  const { t } = useI18n();
  const priceId = useId();
  const typeId = useId();
  const sortId = useId();
  const agentId = useId();
  const favoritesId = useId();
  const [controlsOpen, setControlsOpen] = useState(false);

  const priceOptions: Array<PricingFilter | ''> = ['', 'open-source', 'free', 'free-open-source', 'freemium', 'paid'];
  const sortOptions: SortId[] = ['relevance', 'featured', 'az', 'opensource'];

  const activeCount = [
    filters.pricing !== '',
    filters.type !== '',
    filters.sort !== 'relevance',
    filters.agentReady,
    filters.favoritesOnly,
  ].filter(Boolean).length;

  const priceLabel = (price: PricingFilter | '') => {
    if (price === '') return t.allPrices;
    if (price === 'open-source') return t.openSource;
    if (price === 'free') return t.free;
    if (price === 'free-open-source') return t.freeOpenSource;
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
    <section aria-labelledby="filters-heading" className="rounded-xl border border-border bg-card/50 px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          aria-label={t.filtersTitle}
          aria-expanded={controlsOpen}
          aria-controls="filter-controls"
          onClick={() => setControlsOpen((current) => !current)}
          className="inline-flex min-h-9 items-center gap-2 rounded-md text-sm font-medium text-foreground hover:text-primary"
        >
          <SlidersHorizontal className="h-4 w-4 text-primary" aria-hidden="true" />
          {t.advancedFilters}
          {activeCount > 0 && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
              {interpolate(t.activeFiltersCount, { count: activeCount })}
            </span>
          )}
        </button>
        <button type="button" onClick={onReset} className="rounded text-sm font-medium text-primary hover:underline">
          {t.clearAllFilters}
        </button>
        <h2 id="filters-heading" className="sr-only">{t.filtersTitle}</h2>
      </div>

      <div
        id="filter-controls"
        className={cn('gap-3 pt-4 sm:grid sm:grid-cols-2 lg:grid-cols-5', controlsOpen ? 'grid' : 'hidden')}
      >
        <div>
          <label className="mb-1 block text-xs text-muted-foreground" htmlFor={priceId}>{t.price}</label>
          <select
            id={priceId}
            className={selectClass}
            value={filters.pricing}
            onChange={(event) => {
              const value = event.target.value;
              onChange({ pricing: isPricingFilter(value) ? value : '' });
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

      <p className="mt-3 text-xs text-muted-foreground">{t.metadataNote}</p>
    </section>
  );
}
