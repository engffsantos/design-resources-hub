'use client';

import { X } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import type { CatalogFilters } from '@/hooks/useCatalogUrlState';
import { categoryLabel, interpolate } from '@/locales';

interface Chip {
  key: string;
  label: string;
  patch: Partial<CatalogFilters>;
}

interface ActiveFilterChipsProps {
  filters: CatalogFilters;
  onChange: (patch: Partial<CatalogFilters>) => void;
}

/** Accessible one-click removal for every active filter, including search text. */
export function ActiveFilterChips({ filters, onChange }: ActiveFilterChipsProps) {
  const { t } = useI18n();
  const chips: Chip[] = [];

  if (filters.q.trim()) {
    chips.push({ key: 'q', label: `${t.searchLabel}: ${filters.q.trim()}`, patch: { q: '' } });
  }
  if (filters.track !== 'all') {
    chips.push({
      key: 'track',
      label: `${t.trackLabel}: ${categoryLabel(t, filters.track)}`,
      patch: { track: 'all' },
    });
  }
  if (filters.category !== 'all') {
    chips.push({
      key: 'category',
      label: `${t.category}: ${categoryLabel(t, filters.category)}`,
      patch: { category: 'all' },
    });
  }
  if (filters.pricing) {
    const priceLabels = {
      'open-source': t.openSource,
      free: t.free,
      'free-open-source': t.freeOpenSource,
      freemium: t.freemium,
      paid: t.paid,
    } as const;
    chips.push({
      key: 'pricing',
      label: `${t.price}: ${priceLabels[filters.pricing]}`,
      patch: { pricing: '' },
    });
  }
  if (filters.type) {
    chips.push({ key: 'type', label: `${t.type}: ${filters.type}`, patch: { type: '' } });
  }
  if (filters.sort !== 'relevance') {
    const sortLabels = {
      featured: t.sortFeatured,
      az: t.sortAZ,
      opensource: t.sortOpenSource,
    } as const;
    chips.push({
      key: 'sort',
      label: `${t.sort}: ${sortLabels[filters.sort]}`,
      patch: { sort: 'relevance' },
    });
  }
  if (filters.agentReady) {
    chips.push({ key: 'agent', label: t.agentReadyOnly, patch: { agentReady: false } });
  }
  if (filters.favoritesOnly) {
    chips.push({ key: 'favorites', label: t.favoritesOnly, patch: { favoritesOnly: false } });
  }

  if (chips.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2" aria-label={t.activeFilters}>
      {chips.map((chip) => (
        <li key={chip.key}>
          <button
            type="button"
            onClick={() => onChange(chip.patch)}
            aria-label={interpolate(t.removeFilter, { label: chip.label })}
            className="inline-flex items-center gap-1 rounded-full border border-input bg-muted px-3 py-1 text-xs text-foreground hover:bg-secondary"
          >
            {chip.label}
            <X className="h-3 w-3" aria-hidden="true" />
          </button>
        </li>
      ))}
    </ul>
  );
}
