'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { CategoryFilter, type CategoryOption } from '@/components/CategoryFilter';
import { FilterPanel } from '@/components/FilterPanel';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Pagination } from '@/components/Pagination';
import { ResourceCard } from '@/components/ResourceCard';
import { ResourceModal } from '@/components/ResourceModal';
import { SearchBar } from '@/components/SearchBar';
import { StatsBar } from '@/components/StatsBar';
import { TrackTabs, type TrackSelection } from '@/components/TrackTabs';
import type { Category } from '@/data/resources';
import { useI18n } from '@/context/I18nContext';
import { categoryLabel } from '@/locales';
import { useLocalStorage, useReducedMotion } from '@/hooks';
import { useCatalogUrlState } from '@/hooks/useCatalogUrlState';
import {
  catalogCategories,
  catalogResources,
  computeStats,
  getEditorialResources,
  searchCatalog,
  TRACKS,
  type CatalogResource,
} from '@/lib/catalog';

const PAGE_SIZE = 12;

export function App() {
  const { t } = useI18n();
  const prefersReducedMotion = useReducedMotion();
  const { filters, updateFilters, setPage, reset } = useCatalogUrlState();
  const [favorites, setFavorites] = useLocalStorage<string[]>('strata-favorites', []);
  const [selectedResource, setSelectedResource] = useState<CatalogResource | null>(null);

  const deferredQuery = useDeferredValue(filters.q);
  const stats = useMemo(() => computeStats(catalogResources), []);
  const favoriteIds = useMemo(() => new Set(favorites), [favorites]);

  const results = useMemo(() => searchCatalog(catalogResources, {
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
    deferredQuery, filters.track, filters.category, filters.pricing,
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

  const hasActiveFilters = filters.q.trim() !== '' || filters.track !== 'all' ||
    filters.category !== 'all' || filters.pricing !== '' || filters.type !== '' ||
    filters.agentReady || filters.favoritesOnly;

  const editorialResources = useMemo(
    () => (!hasActiveFilters && page === 1 ? getEditorialResources() : []),
    [hasActiveFilters, page],
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

      <main id="main-content" className="pt-24 pb-16">
        <motion.section
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          aria-labelledby="hero-title"
        >
          <div className="mb-10 text-center">
            <h1 id="hero-title" className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Strata <span className="text-primary">—</span> Design & Agent Index
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">{t.tagline}</p>
          </div>

          <StatsBar stats={stats} filteredCount={results.length} />
        </motion.section>

        <section className="mx-auto mt-8 max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8" aria-label={t.filtersTitle}>
          <SearchBar
            value={filters.q}
            onChange={(q) => updateFilters({ q })}
            resultCount={results.length}
          />

          <TrackTabs
            value={filters.track}
            counts={stats.byTrack}
            total={stats.total}
            onChange={handleTrackChange}
          />

          <CategoryFilter
            activeCategory={filters.category}
            categories={categoriesInTrack}
            onCategoryChange={handleCategoryChange}
          />

          <FilterPanel
            filters={filters}
            resourceTypes={resourceTypes}
            favoritesCount={favoriteIds.size}
            onChange={updateFilters}
            onReset={reset}
          />
        </section>

        <section
          id="catalog-panel"
          role="tabpanel"
          aria-labelledby={`track-tab-${filters.track}`}
          className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${filters.track}-${filters.category}-${deferredQuery}-${page}`}
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
            >
              {editorialResources.length > 0 && (
                <div className="mb-12">
                  <h2 className="mb-6 text-2xl font-bold">{t.featuredResources}</h2>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {editorialResources.map((resource, index) => (
                      <ResourceCard
                        key={`editorial-${resource.id}`}
                        resource={resource}
                        index={index}
                        disableStagger={prefersReducedMotion}
                        isFavorite={favoriteIds.has(resource.id)}
                        onToggleFavorite={toggleFavorite}
                        onOpenDetails={setSelectedResource}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div>
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
            </motion.div>
          </AnimatePresence>

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
