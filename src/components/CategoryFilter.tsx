'use client';

import { motion } from 'framer-motion';
import {
  Bot,
  Box,
  Boxes,
  Cpu,
  GitBranch,
  HelpCircle,
  Layers,
  LayoutTemplate,
  MousePointer2,
  Move,
  Network,
  Package,
  Palette,
  Shield,
  Sparkles,
  Type,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { categories, Category } from '@/data/resources';
import { useReducedMotion } from '@/hooks';
import { ptBR } from '@/locales/pt-BR';

interface CategoryFilterProps {
  activeCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
}

const categoryIcons: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  'layout-template': LayoutTemplate,
  cube: Box,
  move: Move,
  'mouse-pointer-2': MousePointer2,
  type: Type,
  'git-branch': GitBranch,
  package: Package,
  shield: Shield,
  cpu: Cpu,
  network: Network,
  bot: Bot,
  palette: Palette,
  layers: Layers,
  boxes: Boxes,
};

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  const prefersReducedMotion = useReducedMotion();
  const allCategories: (Category | 'all')[] = ['all', ...categories.map((category) => category.id)];

  return (
    <div className="relative -mx-4 sm:mx-0">
      <div
        className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 scroll-smooth sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
        role="group"
        aria-label="Filter by category"
      >
        {allCategories.map((category) => {
          const isActive = activeCategory === category;
          const categoryInfo = categories.find((item) => item.id === category);
          const Icon = categoryInfo ? categoryIcons[categoryInfo.icon] ?? HelpCircle : undefined;

          return (
            <motion.button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={cn(
                'relative inline-flex shrink-0 snap-start items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                'whitespace-nowrap'
              )}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
              aria-pressed={isActive}
              aria-label={categoryInfo?.label ?? ptBR.allCategories}
            >
              {Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
              <span>{categoryInfo?.label ?? ptBR.allCategories}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
