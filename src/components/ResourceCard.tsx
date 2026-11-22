'use client';

import { motion } from 'framer-motion';
import { Bot, ExternalLink, Heart, Info, Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { CatalogResource, Pricing } from '@/lib/catalog';
import { cn, formatUrl, getCategoryColor } from '@/lib/utils';
import { useI18n } from '@/context/I18nContext';
import { useReducedMotion } from '@/hooks';
import { categoryLabel, interpolate } from '@/locales';

interface ResourceCardProps {
  resource: CatalogResource;
  index: number;
  disableStagger?: boolean;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenDetails: (resource: CatalogResource) => void;
}

function priceLabel(price: Pricing, t: ReturnType<typeof useI18n>['t']): string {
  switch (price) {
    case 'open-source': return t.openSource;
    case 'free': return t.free;
    case 'freemium': return t.freemium;
    case 'paid': return t.paid;
  }
}

function priceVariant(price: Pricing): 'success' | 'warning' | 'secondary' {
  if (price === 'open-source' || price === 'free') return 'success';
  if (price === 'freemium') return 'warning';
  return 'secondary';
}

export function ResourceCard({
  resource, index, disableStagger = false, isFavorite, onToggleFavorite, onOpenDetails,
}: ResourceCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useI18n();
  const titleId = `resource-title-${resource.id}`;

  return (
    <motion.article
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.35,
        delay: prefersReducedMotion || disableStagger ? 0 : Math.min(index, 11) * 0.03,
      }}
      aria-labelledby={titleId}
      className="h-full"
    >
      <Card className="flex h-full flex-col overflow-hidden border-border bg-card/80 backdrop-blur-sm transition-shadow hover:shadow-md">
        <CardContent className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {resource.track && (
              <Badge variant="secondary" className="text-[11px]">
                {categoryLabel(t, resource.track)}
              </Badge>
            )}
            <Badge variant="plain" className={cn('text-xs', getCategoryColor(resource.category))}>
              {categoryLabel(t, resource.category)}
            </Badge>
            {resource.featured && (
              <Badge variant="warning" className="gap-1">
                <Star className="h-3 w-3" aria-hidden="true" />
                {t.featured}
              </Badge>
            )}
            {resource.agentConsumable === true && (
              <Badge variant="success" className="gap-1">
                <Bot className="h-3 w-3" aria-hidden="true" />
                {t.agentReady}
              </Badge>
            )}
          </div>

          <h3 id={titleId} className="text-lg font-semibold leading-snug text-foreground">
            {resource.name}
          </h3>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">{resource.description}</p>

          {resource.whenToUse && (
            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.whenToUse}</p>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{resource.whenToUse}</p>
            </div>
          )}

          {resource.stack && resource.stack.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.stack}</p>
              <ul className="mt-1 flex flex-wrap gap-1" aria-label={t.stack}>
                {resource.stack.slice(0, 3).map((item) => (
                  <li key={item} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                    {item}
                  </li>
                ))}
                {resource.stack.length > 3 && (
                  <li className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                    +{resource.stack.length - 3}
                  </li>
                )}
              </ul>
            </div>
          )}

          {resource.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t.tags}>
              {resource.tags.slice(0, 4).map((tag) => (
                <li key={tag} className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {tag}
                </li>
              ))}
              {resource.tags.length > 4 && (
                <li className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  +{resource.tags.length - 4}
                </li>
              )}
            </ul>
          )}
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-between gap-2 border-t border-border p-4">
          <div className="flex min-w-0 items-center gap-2">
            <Badge
              variant={resource.pricing ? priceVariant(resource.pricing) : 'outline'}
              title={resource.pricing ? undefined : t.priceUnknownHelp}
            >
              {resource.pricing ? priceLabel(resource.pricing, t) : t.unknownPrice}
            </Badge>
            <span className="max-w-[9rem] truncate font-mono text-xs text-muted-foreground">
              {formatUrl(resource.url)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleFavorite(resource.id)}
              aria-pressed={isFavorite}
              aria-label={interpolate(isFavorite ? t.removeFromFavorites : t.addToFavorites, { name: resource.name })}
              className={cn(
                'inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-card transition-colors',
                isFavorite ? 'text-destructive' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onOpenDetails(resource)}
              aria-label={interpolate(t.openDetails, { name: resource.name })}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-card text-muted-foreground hover:text-foreground"
            >
              <Info className="h-4 w-4" aria-hidden="true" />
            </button>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={interpolate(t.visitResource, { name: resource.name })}
              className="inline-flex h-8 items-center gap-1 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.visit}</span>
            </a>
          </div>
        </CardFooter>
      </Card>
    </motion.article>
  );
}
