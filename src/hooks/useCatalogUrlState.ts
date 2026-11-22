import { useCallback, useEffect, useRef, useState } from 'react';
import type { Category } from '@/data/resources';
import {
  catalogCategories,
  isPricing,
  TRACKS,
  type Pricing,
  type SortId,
  type TrackId,
} from '@/lib/catalog';

export interface CatalogFilters {
  q: string;
  track: TrackId | 'all';
  category: Category | 'all';
  pricing: Pricing | '';
  type: string;
  sort: SortId;
  agentReady: boolean;
  favoritesOnly: boolean;
  page: number;
}

export const DEFAULT_FILTERS: CatalogFilters = {
  q: '',
  track: 'all',
  category: 'all',
  pricing: '',
  type: '',
  sort: 'relevance',
  agentReady: false,
  favoritesOnly: false,
  page: 1,
};

const TRACK_IDS = new Set<string>(TRACKS.map((track) => track.id));
const CATEGORY_IDS = new Set<string>(catalogCategories.map((category) => category.id));
const SORT_IDS = new Set<string>(['relevance', 'featured', 'az', 'opensource']);

function normalize(value: CatalogFilters): CatalogFilters {
  const page = Number.isFinite(value.page) ? Math.max(1, Math.floor(value.page)) : 1;
  return {
    q: typeof value.q === 'string' ? value.q.slice(0, 200) : '',
    track: TRACK_IDS.has(value.track) ? value.track : 'all',
    category: CATEGORY_IDS.has(value.category) ? value.category : 'all',
    pricing: value.pricing === '' || isPricing(value.pricing) ? value.pricing : '',
    type: typeof value.type === 'string' ? value.type.slice(0, 80) : '',
    sort: SORT_IDS.has(value.sort) ? value.sort : 'relevance',
    agentReady: value.agentReady === true,
    favoritesOnly: value.favoritesOnly === true,
    page,
  };
}

function parseSearch(search: string): CatalogFilters {
  const params = new URLSearchParams(search);
  const rawTrack = (params.get('track') ?? 'all').toLowerCase();
  const rawCategory = (params.get('category') ?? 'all').toLowerCase();
  const rawPricing = params.get('pricing') ?? '';
  const rawSort = (params.get('sort') ?? 'relevance').toLowerCase();
  const page = Number(params.get('page') ?? '1');

  return normalize({
    q: params.get('q') ?? '',
    track: TRACK_IDS.has(rawTrack) ? (rawTrack as TrackId) : 'all',
    category: CATEGORY_IDS.has(rawCategory) ? (rawCategory as Category) : 'all',
    pricing: isPricing(rawPricing) ? rawPricing : '',
    type: params.get('type') ?? '',
    sort: SORT_IDS.has(rawSort) ? (rawSort as SortId) : 'relevance',
    agentReady: params.get('agent') === '1',
    favoritesOnly: params.get('favorites') === '1',
    page,
  });
}

function serialize(value: CatalogFilters): string {
  const params = new URLSearchParams();
  if (value.q) params.set('q', value.q);
  if (value.track !== 'all') params.set('track', value.track);
  if (value.category !== 'all') params.set('category', value.category);
  if (value.pricing) params.set('pricing', value.pricing);
  if (value.type) params.set('type', value.type);
  if (value.sort !== 'relevance') params.set('sort', value.sort);
  if (value.agentReady) params.set('agent', '1');
  if (value.favoritesOnly) params.set('favorites', '1');
  if (value.page > 1) params.set('page', String(value.page));
  return params.toString();
}

export function useCatalogUrlState() {
  const [filters, setFilters] = useState<CatalogFilters>(() =>
    parseSearch(typeof window === 'undefined' ? '' : window.location.search),
  );
  const filtersRef = useRef(filters);

  useEffect(() => {
    const handlePopState = () => {
      const next = parseSearch(window.location.search);
      filtersRef.current = next;
      setFilters(next);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const write = useCallback((patch: Partial<CatalogFilters>, resetPage = false) => {
    const next = normalize({
      ...filtersRef.current,
      ...patch,
      ...(resetPage ? { page: 1 } : {}),
    });
    filtersRef.current = next;
    setFilters(next);
    const query = serialize(next);
    const url = `${window.location.pathname}${query ? `?${query}` : ''}`;
    window.history.replaceState(window.history.state, '', url);
  }, []);

  const updateFilters = useCallback(
    (patch: Partial<CatalogFilters>) => write(patch, true),
    [write],
  );

  const setPage = useCallback((page: number) => write({ page }), [write]);

  const reset = useCallback(() => write(DEFAULT_FILTERS, true), [write]);

  return { filters, updateFilters, setPage, reset } as const;
}
