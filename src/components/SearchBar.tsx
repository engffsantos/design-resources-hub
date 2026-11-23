'use client';

import { Search, X } from 'lucide-react';
import { useId } from 'react';
import { Input } from '@/components/ui/Input';
import { useI18n } from '@/context/I18nContext';
import { interpolate } from '@/locales';

export interface ResultRange {
  /** First item of the current page (0 when the list is empty). */
  from: number;
  /** Last item of the current page (0 when the list is empty). */
  to: number;
  /** Total items in the paginated list — not the size of the current page. */
  total: number;
  /** Editorial picks are rendered separately and must not inflate the range. */
  editorialCount?: number;
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  range?: ResultRange;
}

export function SearchBar({ value, onChange, placeholder, range }: SearchBarProps) {
  const { t } = useI18n();
  const inputId = useId();

  return (
    <form role="search" onSubmit={(event) => event.preventDefault()} className="mx-auto w-full max-w-3xl">
      <label className="sr-only" htmlFor={inputId}>
        {t.searchLabel}
      </label>
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <Input
          id={inputId}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder ?? t.searchPlaceholder}
          autoComplete="off"
          className="h-12 border-border bg-card/90 pl-11 pr-12 text-base shadow-sm backdrop-blur-sm sm:text-lg"
        />
        {value.length > 0 && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label={t.clearSearch}
            className="absolute right-2 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
      {range && (
        <p className="mt-2 text-center text-xs text-muted-foreground sm:text-sm" aria-live="polite">
          {interpolate(t.showingRange, { from: range.from, to: range.to, total: range.total })}
          {range.editorialCount ? ` · ${interpolate(t.editorialNote, { count: range.editorialCount })}` : ''}
        </p>
      )}
    </form>
  );
}
