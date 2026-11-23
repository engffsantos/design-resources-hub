'use client';

import { Bot, LayoutGrid, Palette, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import { TRACKS, type TrackId } from '@/lib/catalog';
import { useI18n } from '@/context/I18nContext';
import { categoryDescription, categoryLabel } from '@/locales';
import { cn } from '@/lib/utils';

export type TrackSelection = TrackId | 'all';

interface TrackTabsProps {
  value: TrackSelection;
  counts: Record<TrackId, number>;
  total: number;
  onChange: (track: TrackSelection) => void;
}

const trackIcons: Record<TrackId, LucideIcon> = {
  'design-ui': Palette,
  'ai-agents': Bot,
  'dev-tools': Wrench,
};

export function TrackTabs({ value, counts, total, onChange }: TrackTabsProps) {
  const { t } = useI18n();
  const tabs: TrackSelection[] = ['all', ...TRACKS.map((track) => track.id)];

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    const next = tabs[nextIndex];
    onChange(next);
    document.getElementById(`track-tab-${next}`)?.focus();
  };

  const buttonClass = (selected: boolean) => cn(
    'rounded-xl border text-left transition-colors',
    selected
      ? 'border-primary bg-primary/10 text-foreground ring-1 ring-primary'
      : 'border-border bg-card text-muted-foreground hover:border-primary/60 hover:bg-accent hover:text-accent-foreground',
  );

  return (
    <section aria-labelledby="tracks-heading" className="mx-auto mt-4 max-w-5xl">
      <h2 id="tracks-heading" className="mb-3 text-sm font-semibold text-foreground sm:text-base">
        {t.tracksTitle}
      </h2>
      <div
        role="tablist"
        aria-label={t.tracksTitle}
        className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0"
      >
        <button
          key="all"
          id="track-tab-all"
          type="button"
          role="tab"
          aria-selected={value === 'all'}
          aria-controls="catalog-panel"
          tabIndex={value === 'all' ? 0 : -1}
          onClick={() => onChange('all')}
          onKeyDown={(event) => handleKeyDown(event, 0)}
          className={cn(buttonClass(value === 'all'), 'flex shrink-0 snap-start items-center justify-between gap-2 px-4 py-2.5 text-sm font-medium sm:col-span-3')}
        >
          <span className="inline-flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-primary" aria-hidden="true" />
            {t.allResources}
          </span>
          <span className="text-xs text-muted-foreground">({total})</span>
        </button>

        {TRACKS.map((track, index) => {
          const Icon = trackIcons[track.id];
          const selected = value === track.id;
          return (
            <button
              key={track.id}
              id={`track-tab-${track.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="catalog-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(track.id)}
              onKeyDown={(event) => handleKeyDown(event, index + 1)}
              className={cn(buttonClass(selected), 'flex w-56 shrink-0 snap-start flex-col items-start gap-1.5 p-3 sm:w-auto')}
            >
              <span className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-1.5 text-primary">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="flex w-full items-baseline justify-between gap-2">
                <span className="text-sm font-semibold text-foreground sm:text-base">
                  {categoryLabel(t, track.id)}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">({counts[track.id]})</span>
              </span>
              <span className="text-xs leading-relaxed text-muted-foreground">
                {categoryDescription(t, track.id)}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
