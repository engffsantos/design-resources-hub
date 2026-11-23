'use client';

import { Boxes, LayoutTemplate, Network, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import type { CatalogFilters } from '@/hooks/useCatalogUrlState';

interface IntentSuggestionsProps {
  onSelect: (patch: Partial<CatalogFilters>) => void;
}

/**
 * Intent-first entry points. Every suggestion maps to filter values that
 * already exist in the catalog state and the shareable URL — no new data.
 */
export function IntentSuggestions({ onSelect }: IntentSuggestionsProps) {
  const { t } = useI18n();

  const suggestions: Array<{
    id: string;
    label: string;
    icon: LucideIcon;
    patch: Partial<CatalogFilters>;
  }> = [
    {
      id: 'landing',
      label: t.intentLanding,
      icon: LayoutTemplate,
      patch: { track: 'design-ui', category: 'landings' },
    },
    {
      id: 'mcp',
      label: t.intentMcp,
      icon: Network,
      patch: { track: 'ai-agents', category: 'mcp-protocols' },
    },
    {
      id: 'components',
      label: t.intentComponents,
      icon: Boxes,
      patch: { track: 'design-ui', category: 'components' },
    },
    {
      id: 'security',
      label: t.intentSecurity,
      icon: ShieldCheck,
      patch: { track: 'dev-tools', category: 'security' },
    },
  ];

  return (
    <section aria-labelledby="intent-heading" className="mx-auto mt-3 max-w-5xl">
      <h2
        id="intent-heading"
        className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground"
      >
        {t.intentTitle}
      </h2>
      <div className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
        {suggestions.map(({ id, label, icon: Icon, patch }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(patch)}
            className="inline-flex shrink-0 snap-start items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:bg-accent hover:text-accent-foreground sm:text-sm"
          >
            <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
