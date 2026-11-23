'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ChevronDown } from 'lucide-react';
import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { ActiveFilterChips } from '@/components/ActiveFilterChips';
import { CategoryFilter, type CategoryOption } from '@/components/CategoryFilter';
import { FilterPanel } from '@/components/FilterPanel';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { IntentSuggestions } from '@/components/IntentSuggestions';
import { Pagination } from '@/components/Pagination';
import { ResourceCard } from '@/components/ResourceCard';
import { ResourceModal } from '@/components/ResourceModal';
import { SearchBar } from '@/components/SearchBar';
import { StatsBar } from '@/components/StatsBar';
import { TrackTabs, type TrackSelection } from '@/components/TrackTabs';
import type { Category } from '@/data/resources';
import { useI18n } from '@/context/I18nContext';
import { categoryLabel, interpolate } from '@/locales';
import { useLocalStorage, useReducedMotion } from '@/hooks';
import { useCatalogUrlState } from '@/hooks/useCatalogUrlState';
import { cn } from '@/lib/utils';
import {
  catalogCategories,
  catalogResources,
  computeStats,
  EDITORIAL_IDS,
  getEditorialResources,
  searchCatalog,
  TRACKS,
  type CatalogResource,
} from '@/lib/catalog';

const PAGE_SIZE = 24;

export function App() {
  const { t } = useI18n();
  const prefersReducedMotion = useReducedMotion();
  const { filters, updateFilters, setPage, reset } = useCatalogUrlState();
  const [favorites, setFavorites] = useLocalStorage<string[]>('strata-favorites', []);
  const [selectedResource, setSelectedResource] = useState<CatalogResource | null>(null);
  const [categoriesVisible, setCategoriesVisible] = useState(false);

  const deferredQuery = useDeferredValue(filters.q);
  const stats = useMemo(() => computeStats(catalogResources), []);
  const favoriteIds = useMemo(() => new Set(favorites), [favorites]);

  const hasActiveFilters = filters.q.trim() !== '' || filters.track !== 'all' ||
    filters.category !== 'all' || filters.pricing !== '' || filters.type !== '' ||
    filters.agentReady || filters.favoritesOnly;

  // Selecting a track reveals its categories; the user can still collapse them.
  useEffect(() => {
    if (filters.track !== 'all') setCategoriesVisible(true);
  }, [filters.track]);

  // The editorial shortlist owns these nine IDs on the home view; keep them out
  // of the paginated grid so no resource is rendered twice.
  const showEditorial = !hasActiveFilters;
  const catalogBase = useMemo(
    () => (showEditorial
      ? catalogResources.filter((resource) => !EDITORIAL_IDS.includes(resource.id))
      : catalogResources),
    [showEditorial],
  );
  const editorialTotal = useMemo(() => getEditorialResources().length, []);

  const results = useMemo(() => searchCatalog(catalogBase, {
    query: deferredQuery,
    track: filters.track === 'all' ? undefined : filters.track,
    category: filters.category === 'all' ? undefined : filters.category,
    pricing: filters.pricing || undefined,
    type: filters.type || undefined,
    agentReady: filters.agentReady || undefined,
    favoritesOnly: filters.favoritesOnly,
    favoriteIds,
    sort: filters.sort,
  }), [
    catalogBase, deferredQuery, filters.track, filters.category, filters.pricing,
    filters.type, filters.agentReady, filters.favoritesOnly, filters.sort, favoriteIds,
  ]);

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const page = Math.min(filters.page, pageCount);

  useEffect(() => {
    if (filters.page !== page) setPage(page);
  }, [filters.page, page, setPage]);

  const pageItems = useMemo(
    () => results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [results, page],
  );

  // Real page boundaries feed SearchBar. Editorial picks are counted apart.
  const range = useMemo(() => ({
    from: results.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1,
    to: Math.min(page * PAGE_SIZE, results.length),
    total: results.length,
    editorialCount: showEditorial && page === 1 ? editorialTotal : 0,
  }), [results.length, page, showEditorial, editorialTotal]);

  const editorialResources = useMemo(
    () => (showEditorial && page === 1 ? getEditorialResources() : []),
    [showEditorial, page],
  );

  const categoriesInTrack = useMemo<CategoryOption[]>(() => {
    const track = TRACKS.find((item) => item.id === filters.track);
    const allowed = track ? new Set<string>(track.categoryIds) : null;
    return catalogCategories
      .filter((category) => !allowed || allowed.has(category.id))
      .map((category) => ({
        id: category.id,
        label: categoryLabel(t, category.id),
        count: stats.byCategory[category.id] ?? 0,
      }));
  }, [filters.track, stats.byCategory, t]);

  const resourceTypes = useMemo(
    () => [...new Set(catalogResources.map((resource) => resource.resourceType).filter((type): type is string => Boolean(type)))].sort(),
    [],
  );

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((current) => current.includes(id)
      ? current.filter((favorite) => favorite !== id)
      : [...current, id]);
  }, [setFavorites]);

  const closeModal = useCallback(() => setSelectedResource(null), []);
  const handleTrackChange = useCallback((track: TrackSelection) => {
    updateFilters({ track, category: 'all' });
  }, [updateFilters]);
  const handleCategoryChange = useCallback((category: Category | 'all') => {
    updateFilters({ category });
  }, [updateFilters]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main id="main-content" className="pt-[4.5rem] pb-16">
        <motion.section
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          aria-labelledby="hero-title"
        >
          <div className="mb-3 text-center sm:mb-4">
            <h1 id="hero-title" className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Strata<span className="hidden text-muted-foreground sm:inline"> — {t.heroTitleSuffix}</span>
            </h1>
            <p className="mt-1.5 text-base font-semibold text-foreground sm:mt-2 sm:text-xl">{t.heroLead}</p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              {interpolate(t.heroSubtitle, { count: stats.total })}
            </p>
          </div>

          <StatsBar stats={stats} />
        </motion.section>

        <section aria-label={t.filtersTitle} className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
          <SearchBar
            value={filters.q}
            onChange={(q) => updateFilters({ q })}
            range={range}
          />

          <IntentSuggestions onSelect={updateFilters} />

          <TrackTabs
            value={filters.track}
            counts={stats.byTrack}
            total={stats.total}
            onChange={handleTrackChange}
          />
        </section>

        <section
          id="catalog-panel"
          role="tabpanel"
          aria-labelledby={`track-tab-${filters.track}`}
          className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          {editorialResources.length > 0 && (
            <div className="mb-8">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-2 sm:mb-5 sm:gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {t.featuredEyebrow}
                  </p>
                  <h2 className="mt-0.5 text-xl font-bold sm:mt-1 sm:text-2xl">{t.featuredResources}</h2>
                  <p className="mt-1 hidden text-sm text-muted-foreground sm:block">{t.featuredDescription}</p>
                </div>
                <a
                  href="#catalog-results"
                  className="inline-flex min-h-9 items-center gap-1 rounded-md text-sm font-medium text-primary hover:underline"
                >
                  {t.seeAll} <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {editorialResources.map((resource, index) => (
                  <ResourceCard
                    key={`editorial-${resource.id}`}
                    resource={resource}
                    index={index}
                    featured
                    disableStagger={prefersReducedMotion}
                    isFavorite={favoriteIds.has(resource.id)}
                    onToggleFavorite={toggleFavorite}
                    onOpenDetails={setSelectedResource}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              type="button"
              aria-expanded={categoriesVisible}
              aria-controls="category-options"
              onClick={() => setCategoriesVisible((visible) => !visible)}
              className="inline-flex min-h-9 items-center gap-2 self-start rounded-md text-sm font-medium text-foreground hover:text-primary"
            >
              <ChevronDown
                className={cn('h-4 w-4 text-primary transition-transform', categoriesVisible && 'rotate-180')}
                aria-hidden="true"
              />
              {categoriesVisible
                ? t.hideCategories
                : interpolate(t.browseCategories, { count: catalogCategories.length })}
            </button>

            <div
              id="category-options"
              hidden={!categoriesVisible}
              className="rounded-xl border border-border bg-card/50 p-3"
            >
              <CategoryFilter
                activeCategory={filters.category}
                categories={categoriesInTrack}
                onCategoryChange={handleCategoryChange}
              />
            </div>

            <FilterPanel
              filters={filters}
              resourceTypes={resourceTypes}
              favoritesCount={favoriteIds.size}
              onChange={updateFilters}
              onReset={reset}
            />

            <ActiveFilterChips filters={filters} onChange={updateFilters} />
          </div>

          <div id="catalog-results" className="mt-8 scroll-mt-24">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-2xl font-bold">
                {filters.q.trim()
                  ? <>{t.resultsFor} “{filters.q.trim()}”</>
                  : filters.category !== 'all'
                    ? categoryLabel(t, filters.category)
                    : filters.track !== 'all'
                      ? categoryLabel(t, filters.track)
                      : t.allResources}
              </h2>
              <p className="text-sm text-muted-foreground" aria-live="polite">
                {results.length} {results.length === 1 ? t.resource : t.resources}
              </p>
            </div>

            {pageItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {pageItems.map((resource, index) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    index={index}
                    disableStagger={prefersReducedMotion || pageItems.length > 8}
                    isFavorite={favoriteIds.has(resource.id)}
                    onToggleFavorite={toggleFavorite}
                    onOpenDetails={setSelectedResource}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-card/60 p-12 text-center">
                <p className="mb-4 text-muted-foreground">
                  {filters.favoritesOnly && favoriteIds.size === 0 ? t.noFavorites : t.noResultsSearch}
                </p>
                <button type="button" onClick={reset} className="rounded font-medium text-primary hover:underline">
                  {t.clearAllFilters}
                </button>
              </div>
            )}
          </div>

          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        </section>
      </main>

      <Footer />

      <AnimatePresence>
        {selectedResource && (
          <ResourceModal
            resource={selectedResource}
            isFavorite={favoriteIds.has(selectedResource.id)}
            onToggleFavorite={toggleFavorite}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
