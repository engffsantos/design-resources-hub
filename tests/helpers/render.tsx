import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { I18nProvider } from '@/context/I18nContext';
import { ThemeProvider } from '@/context/ThemeContext';
import type { Locale } from '@/locales';

interface ProviderOptions extends Omit<RenderOptions, 'wrapper'> {
  locale?: Locale;
}

export function renderWithProviders(ui: ReactElement, options: ProviderOptions = {}): RenderResult {
  const { locale = 'pt-BR', ...renderOptions } = options;
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider>
      <I18nProvider initialLocale={locale}>{children}</I18nProvider>
    </ThemeProvider>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export { renderWithProviders as render };
