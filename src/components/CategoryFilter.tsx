'use client';

import {
  Bot, Box, Boxes, Check, Cpu, GitBranch, HelpCircle, Layers, LayoutTemplate, MousePointer2,
  Move, Package, Palette, Shield, Sparkles, Type,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { categoryLabel } from '@/locales';
import { cn } from '@/lib/utils';
import type { Category } from '@/data/resources';

export interface CategoryOption {
  id: Category;
  label: string;
  count: number;
}

interface CategoryFilterProps {
  activeCategory: Category | 'all';
  categories: CategoryOption[];
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
  network: Layers,
  bot: Bot,
  palette: Palette,
  layers: Layers,
  boxes: Boxes,
};

export function CategoryFilter({ activeCategory, categories, onCategoryChange }: CategoryFilterProps) {
  const { t } = useI18n();

  return (
    <div className="-mx-4 sm:mx-0">
      <div
        className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
        role="group"
        aria-label={t.categoriesTitle}
      >
        {(['all', ...categories.map((c) => c.id)] as const).map((category) => {
          const isActive = activeCategory === category;
          const info = categories.find((c) => c.id === category);
          const Icon = info ? categoryIcons[getIconForCategory(info.id)] ?? HelpCircle : undefined;
          const label = category === 'all' ? t.allCategories : categoryLabel(t, category);

          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              aria-pressed={isActive}
              className={cn(
                'inline-flex shrink-0 snap-start items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'border border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )}
            >
              {isActive
                ? <Check className="h-4 w-4" aria-hidden="true" />
                : Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
              <span>{label}</span>
              {info && <span className="text-xs opacity-80">({info.count})</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function getIconForCategory(category: Category): string {
  const icons: Partial<Record<Category, string>> = {
    'ai-prompts': 'sparkles',
    landings: 'layout-template',
    components: 'cube',
    motion: 'move',
    'micro-interactions': 'mouse-pointer-2',
    typography: 'type',
    'ux-flows': 'git-branch',
    libraries: 'package',
    security: 'shield',
    'agent-skills': 'bot',
    'mcp-protocols': 'network',
    'agent-infra': 'cpu',
    'icons-assets': 'palette',
    'design-systems': 'layers',
    'agent-templates': 'boxes',
  };
  return icons[category] ?? 'layers';
}
