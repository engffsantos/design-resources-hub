'use client';

import { motion } from 'framer-motion';
import { Github, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { useTheme, type ThemeMode } from '@/context/ThemeContext';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

const REPOSITORY_URL = 'https://github.com/engffsantos/design-resources-hub';

export function Header() {
  const prefersReducedMotion = useReducedMotion();
  const { t, locale, setLocale } = useI18n();
  const { mode, setMode } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t.skipToContent}
      </a>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 backdrop-blur-md',
          scrolled
            ? 'border-border bg-background/85 shadow-sm'
            : 'border-transparent bg-background/60',
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex min-w-0 items-center gap-2 rounded-md" aria-label={t.siteTitle}>
            <Sparkles className="h-7 w-7 shrink-0 text-primary" aria-hidden="true" />
            <span className="truncate text-lg font-bold tracking-tight sm:text-xl">Strata</span>
          </a>

          <nav aria-label={t.mainNavigation} className="hidden items-center gap-5 text-sm md:flex">
            <a className="rounded text-muted-foreground hover:text-foreground" href="/#main-content">
              {t.allResources}
            </a>
            <a className="rounded text-muted-foreground hover:text-foreground" href="/agents">
              A2A
            </a>
            <a className="rounded text-muted-foreground hover:text-foreground" href="/catalog.json">
              JSON
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor="strata-locale">
              {t.language}
            </label>
            <select
              id="strata-locale"
              value={locale}
              onChange={(event) => setLocale(event.target.value as 'pt-BR' | 'en')}
              className="h-9 rounded-md border border-input bg-card px-2 text-sm text-foreground"
            >
              <option value="pt-BR">{t.portuguese}</option>
              <option value="en">{t.english}</option>
            </select>

            <label className="sr-only" htmlFor="strata-theme">
              {t.themeLabel}
            </label>
            <select
              id="strata-theme"
              value={mode}
              onChange={(event) => setMode(event.target.value as ThemeMode)}
              className="h-9 rounded-md border border-input bg-card px-2 text-sm text-foreground"
            >
              <option value="system">{t.themeSystem}</option>
              <option value="light">{t.themeLight}</option>
              <option value="dark">{t.themeDark}</option>
            </select>

            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.github}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-card text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.header>
    </>
  );
}
