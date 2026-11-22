'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SearchBar } from '@/components/SearchBar';
import { ResourceCard } from '@/components/ResourceCard';
import { StatsBar } from '@/components/StatsBar';
import { resources, categories, Category, searchResources } from '@/data/resources';
import { useReducedMotion } from '@/hooks';
import { ptBR } from '@/locales/pt-BR';

export function App() {
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = useMemo(() => {
    let result = searchResources(searchQuery);
    if (activeCategory !== 'all') {
      result = result.filter(r => r.category === activeCategory);
    }
    return result;
  }, [searchQuery, activeCategory]);

  const featuredResources = useMemo(() => 
    resources.filter(r => r.featured && (activeCategory === 'all' || r.category === activeCategory))
  , [activeCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white/50 to-white dark:from-dark-950 dark:via-dark-900/50 dark:to-dark-950">
      <Header />
      
      <main className="pt-24 pb-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent"
            >
              Design Recursos{' '}
              <span className="relative">
                Resources
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-2 bg-primary/20 -z-10"
                  animate={{ scaleX: [0, 1] }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.3 }}
                />
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.2 }}
              className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              {ptBR.tagline}
            </motion.p>
          </div>

          <StatsBar filteredCount={filteredResources.length} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 items-start justify-between"
          >
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name, description, tags, or category..."
              resultCount={filteredResources.length}
            />
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </motion.div>
        </motion.section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            >
              {featuredResources.length > 0 && activeCategory === 'all' && !searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="text-primary">★</span>
                    {ptBR.featuredResources}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredResources.map((resource, index) => (
                      <ResourceCard key={resource.id} resource={resource} index={index} />
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
              >
                {activeCategory !== 'all' || searchQuery ? (
                  <h2 className="text-2xl font-bold mb-6">
                    {searchQuery ? (
                      <>
                        Resultados para "<span className="text-primary">{searchQuery}</span>"
                      </>
                    ) : (
                      <>
                        {categories.find(c => c.id === activeCategory)?.label || 'All'} {ptBR.resources}
                      </>
                    )}
                  </h2>
                ) : (
                  <h2 className="text-2xl font-bold mb-6">{ptBR.allResources}</h2>
                )}

                {filteredResources.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredResources.map((resource, index) => (
                      <ResourceCard key={resource.id} resource={resource} index={index} />
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 px-6 bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-border/50"
                  >
                    <p className="text-muted-foreground mb-4">
                      {searchQuery || activeCategory !== 'all'
                        ? ptBR.noResultsSearch
                        : ptBR.noResultsAvailable}
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('all');
                      }}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      {ptBR.clearAllFilters}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      <Footer />
    </div>
  );
}