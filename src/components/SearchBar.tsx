'use client';

import { Search, X } from 'lucide-react';
import { useId } from 'react';
import { Input } from '@/components/ui/Input';
import { useI18n } from '@/context/I18nContext';
import { interpolate } from '@/locales';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resultCount?: number;
}

export function SearchBar({ value, onChange, placeholder, resultCount }: SearchBarProps) {
  const { t } = useI18n();
  const inputId = useId();

  return (
    <form role="search" onSubmit={(event) => event.preventDefault()} className="w-full max-w-xl">
      <label className="sr-only" htmlFor={inputId}>
        {t.searchLabel}
      </label>
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute left-3 h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <Input
          id={inputId}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder ?? t.searchPlaceholder}
          autoComplete="off"
          className="border-border bg-card/80 pl-10 pr-10 backdrop-blur-sm"
        />
        {value.length > 0 && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label={t.clearSearch}
            className="absolute right-2 inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
      {resultCount !== undefined && (
        <p className="mt-2 text-right text-sm text-muted-foreground" aria-live="polite">
          {interpolate(t.showingRange, {
            from: resultCount === 0 ? 0 : 1,
            to: resultCount,
            total: resultCount,
          })}
          {' · '}
          {interpolate(t.resourcesCount, { count: resultCount })}
        </p>
      )}
    </form>
  );
}
