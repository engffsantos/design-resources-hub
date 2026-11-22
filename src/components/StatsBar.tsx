'use client';

import { motion } from 'framer-motion';
import { computeStats, type CatalogStats } from '@/lib/catalog';
import { useReducedMotion } from '@/hooks';
import { useI18n } from '@/context/I18nContext';
import { interpolate } from '@/locales';

interface StatsBarProps {
  stats?: CatalogStats;
  filteredCount: number;
}

export function StatsBar({ stats: providedStats, filteredCount }: StatsBarProps) {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useI18n();
  const stats = providedStats ?? computeStats();

  const items = [
    { label: t.totalResources, value: stats.total },
    { label: t.categories, value: stats.categories },
    { label: t.agentReady, value: stats.agentReady },
    { label: t.showing, value: filteredCount },
  ];

  return (
    <section aria-label={t.siteTitle} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3, delay: index * 0.05 }}
            className="rounded-xl border border-border bg-card/60 p-4 text-center backdrop-blur-sm"
          >
            <dt className="sr-only">{item.label}</dt>
            <dd>
              <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-3xl font-bold text-transparent">
                {item.value}
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">{item.label}</span>
            </dd>
          </motion.div>
        ))}
      </dl>
      <p className="mt-3 text-xs text-muted-foreground">
        {interpolate(t.unknownPricingCount, { count: stats.unknownPricing })} · {t.metadataNote}
      </p>
    </section>
  );
}
