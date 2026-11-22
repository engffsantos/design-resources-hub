'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { categories, Category } from '@/data/resources';
import { useReducedMotion } from '@/hooks';
import { ptBR } from '@/locales/pt-BR';

interface CategoryFilterProps {
  activeCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  const prefersReducedMotion = useReducedMotion();

  const allCategories: (Category | 'all')[] = ['all', ...categories.map(c => c.id)];

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {allCategories.map((cat) => {
          const isActive = activeCategory === cat;
          const categoryInfo = categories.find(c => c.id === cat);
          
          return (
            <motion.button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={cn(
                'relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                'whitespace-nowrap'
              )}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
              aria-pressed={isActive}
            >
              {cat === 'all' ? (
                ptBR.allCategories
              ) : (
                <>
                  {categoryInfo && (
                    <span className="capitalize">{categoryInfo.label}</span>
                  )}
                </>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}