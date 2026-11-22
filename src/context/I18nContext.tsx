import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { dictionaries, type Dictionary, type Locale } from '@/locales';

const STORAGE_KEY = 'strata-locale';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function isLocale(value: unknown): value is Locale {
  return value === 'pt-BR' || value === 'en';
}

/** URL wins over storage so shared deep links render in the intended language. */
function localeFromUrl(): Locale | null {
  if (typeof window === 'undefined') return null;
  const raw = new URLSearchParams(window.location.search).get('lang');
  return isLocale(raw) ? raw : null;
}

function writeLocaleToUrl(locale: Locale): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  params.set('lang', locale);
  const query = params.toString();
  window.history.replaceState(
    window.history.state,
    '',
    `${window.location.pathname}${query ? `?${query}` : ''}`,
  );
}

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'pt-BR';
  const fromUrl = localeFromUrl();
  if (fromUrl) return fromUrl;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    if (isLocale(parsed)) return parsed;
  } catch {
    /* Continue with navigator detection. */
  }
  const nav = window.navigator.language.toLowerCase();
  return nav.startsWith('pt') ? 'pt-BR' : 'en';
}

export function I18nProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(() => initialLocale ?? detectLocale());

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(locale));
    } catch {
      /* Storage can be unavailable in private browsing. */
    }
  }, [locale]);

  useEffect(() => {
    const handlePopState = () => {
      const fromUrl = localeFromUrl();
      if (fromUrl) setLocaleState(fromUrl);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    writeLocaleToUrl(next);
    setLocaleState(next);
  }, []);
  const t = dictionaries[locale];
  const value = useMemo<I18nContextValue>(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside I18nProvider');
  return context;
}
