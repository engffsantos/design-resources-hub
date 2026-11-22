'use client';

import { Heart, Sparkles } from 'lucide-react';
import { catalogCategories } from '@/lib/catalog';
import { useI18n } from '@/context/I18nContext';
import { categoryLabel } from '@/locales';

const REPOSITORY_URL = 'https://github.com/engffsantos/design-resources-hub';
const ISSUES_URL = `${REPOSITORY_URL}/issues/new`;

export function Footer() {
  const { t } = useI18n();

  const discoveryLinks = [
    { href: '/agents', label: 'A2A / Agents' },
    { href: '/catalog.json', label: 'catalog.json' },
    { href: '/llms.txt', label: 'llms.txt' },
    { href: '/llms-full.txt', label: 'llms-full.txt' },
  ];

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <section className="space-y-4" aria-labelledby="footer-about">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
              <h2 id="footer-about" className="text-lg font-bold">Strata</h2>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">{t.footerDescription}</p>
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded text-sm font-medium text-primary hover:underline"
            >
              {t.github} ↗
            </a>
          </section>

          <section aria-labelledby="footer-categories">
            <h2 id="footer-categories" className="mb-4 font-semibold">{t.categoriesTitle}</h2>
            <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {catalogCategories.map((category) => (
                <li key={category.id}>
                  <a href={`/?category=${category.id}`} className="rounded hover:text-foreground hover:underline">
                    {categoryLabel(t, category.id)}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4" aria-labelledby="footer-discovery">
            <h2 id="footer-discovery" className="font-semibold">{t.aboutTitle}</h2>
            <p className="text-sm text-muted-foreground">{t.builtWith}</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {discoveryLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="rounded hover:text-foreground hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-destructive" aria-hidden="true" />
              {t.madeFor}
            </p>
          </section>
        </div>

        <div className="mt-10 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            {t.curatedWith}{' '}
            <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer" className="rounded underline hover:text-primary">
              {t.submitResource}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
