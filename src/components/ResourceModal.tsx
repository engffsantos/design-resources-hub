'use client';

import { ExternalLink, Heart, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/Badge';
import { useI18n } from '@/context/I18nContext';
import type { CatalogResource } from '@/lib/catalog';
import { categoryLabel, interpolate } from '@/locales';
import { cn, getCategoryColor } from '@/lib/utils';

interface ResourceModalProps {
  resource: CatalogResource;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ResourceModal({ resource, isFavorite, onToggleFavorite, onClose }: ResourceModalProps) {
  const { t } = useI18n();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const priceText = resource.pricing
    ? resource.pricing === 'open-source' ? t.openSource
      : resource.pricing === 'free' ? t.free
      : resource.pricing === 'freemium' ? t.freemium : t.paid
    : t.unknownPrice;

  const rows: Array<{ label: string; value: string }> = [
    { label: t.category, value: categoryLabel(t, resource.category) },
    { label: t.track, value: categoryLabel(t, resource.track) },
    { label: t.whenToUse, value: resource.whenToUse ?? t.notSpecified },
    { label: t.stack, value: resource.stack?.length ? resource.stack.join(', ') : t.notSpecified },
    { label: t.price, value: `${priceText} (${resource.provenance.pricing === 'declared' ? t.declared : t.unknown})` },
    {
      label: t.agentReady,
      value: resource.agentConsumable === true ? t.yes : resource.agentConsumable === false ? t.no : t.unknown,
    },
    {
      label: t.provenance,
      value: resource.provenance.repoUrl === 'derived-from-url' ? t.derived : t.declared,
    },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resource-modal-title"
        className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-border bg-card p-6 shadow-xl"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">{t.detailsTitle}</p>
            <h2 id="resource-modal-title" className="text-2xl font-bold">{resource.name}</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.closeDetails}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-card hover:bg-accent"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="plain" className={cn(getCategoryColor(resource.category))}>
            {categoryLabel(t, resource.category)}
          </Badge>
          <Badge variant="secondary">{categoryLabel(t, resource.track)}</Badge>
          <Badge variant={resource.pricing ? 'success' : 'outline'}>{priceText}</Badge>
        </div>

        <p className="text-sm text-muted-foreground">{resource.description}</p>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {rows.map((row) => (
            <div key={row.label} className="rounded-lg border border-border bg-muted/40 p-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{row.label}</dt>
              <dd className="mt-1 break-words text-sm">{row.value}</dd>
            </div>
          ))}
        </dl>

        {resource.tags.length > 0 && (
          <section className="mt-6" aria-labelledby="modal-tags">
            <h3 id="modal-tags" className="mb-2 text-sm font-semibold">{t.tags}</h3>
            <ul className="flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {tag}
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            {interpolate(t.visitResource, { name: resource.name })}
          </a>
          {resource.repoUrl && (
            <a
              href={resource.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-input bg-card px-4 text-sm font-medium hover:bg-accent"
            >
              {t.repo}
            </a>
          )}
          <button
            type="button"
            onClick={() => onToggleFavorite(resource.id)}
            aria-pressed={isFavorite}
            className={cn(
              'inline-flex h-10 items-center gap-2 rounded-md border border-input bg-card px-4 text-sm font-medium hover:bg-accent',
              isFavorite && 'text-destructive',
            )}
          >
            <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} aria-hidden="true" />
            {isFavorite ? t.favorites : t.addToFavorites.replace('{{name}}', '')}
          </button>
        </div>
      </div>
    </div>
  );
}
