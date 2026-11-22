'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { cn } from '@/lib/utils';

interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onChange }: PaginationProps) {
  const { t } = useI18n();
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  const buttonClass = 'inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-input bg-card px-3 text-sm hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <nav aria-label={t.page} className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label={t.previousPage}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>

      {pages.map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          aria-current={value === page ? 'page' : undefined}
          aria-label={`${t.page} ${value} ${t.pageOf} ${pageCount}`}
          className={cn(buttonClass, value === page && 'border-primary bg-primary text-primary-foreground hover:bg-primary/90')}
        >
          {value}
        </button>
      ))}

      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(page + 1)}
        disabled={page >= pageCount}
        aria-label={t.nextPage}
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
