'use client';

import { computeStats, type CatalogStats } from '@/lib/catalog';
import { useI18n } from '@/context/I18nContext';

interface StatsBarProps {
  stats?: CatalogStats;
}

/**
 * Compact context line. The old four-card grid repeated the initial "showing"
 * value and pushed the first resource below the fold; real page ranges belong
 * to SearchBar, where they describe the paginated list.
 */
export function StatsBar({ stats: providedStats }: StatsBarProps) {
  const { t } = useI18n();
  const stats = providedStats ?? computeStats();

  const items = [
    { key: 'total', label: t.totalResources, value: stats.total },
    { key: 'categories', label: t.categories, value: stats.categories },
    { key: 'agentReady', label: t.agentReady, value: stats.agentReady },
    { key: 'unknown', label: t.unknownPrice, value: stats.unknownPricing },
  ];

  return (
    <section aria-label={t.siteTitle} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <dl className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground sm:text-sm">
        {items.map((item) => (
          <div key={item.key} className="flex items-baseline gap-1.5">
            <dt className="sr-only">{item.label}</dt>
            <dd className="font-semibold text-foreground">{item.value}</dd>
            <span aria-hidden="true">{item.label}</span>
          </div>
        ))}
      </dl>
      <p className="sr-only">{t.metadataNote}</p>
    </section>
  );
}
