'use client';

import type { KeyboardEvent } from 'react';
import { TRACKS, type TrackId } from '@/lib/catalog';
import { useI18n } from '@/context/I18nContext';
import { cn } from '@/lib/utils';

export type TrackSelection = TrackId | 'all';

interface TrackTabsProps {
  value: TrackSelection;
  counts: Record<TrackId, number>;
  total: number;
  onChange: (track: TrackSelection) => void;
}

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

  const labelFor = (track: TrackSelection) => {
    if (track === 'all') return t.allResources;
    return categoryLabelForTrack(track, t);
  };

  return (
    <section aria-labelledby="tracks-heading">
      <h2 id="tracks-heading" className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {t.tracksTitle}
      </h2>
      <div role="tablist" aria-label={t.tracksTitle} className="flex flex-wrap gap-2">
        {tabs.map((track, index) => {
          const label = labelFor(track);
          const count = track === 'all' ? total : counts[track];
          const selected = value === track;
          const description = track === 'all' ? null : TRACKS.find((item) => item.id === track)?.description;
          return (
            <button
              key={track}
              id={`track-tab-${track}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="catalog-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(track)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              title={description ?? undefined}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                selected
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )}
            >
              {label} <span className="text-xs opacity-70">({count})</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function categoryLabelForTrack(track: TrackId, t: ReturnType<typeof useI18n>['t']): string {
  const key = track as keyof typeof t;
  const value = t[key];
  return typeof value === 'string' ? value : track;
}
