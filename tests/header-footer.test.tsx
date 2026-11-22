import { fireEvent, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { renderWithProviders } from './helpers/render';

describe('Header', () => {
  it('uses semantic navigation and a skip link', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: /pular para o conteúdo principal/i })).toHaveAttribute('href', '#main-content');
    expect(screen.getByRole('navigation', { name: /navegação principal/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/engffsantos/design-resources-hub',
    );
  });

  it('switches locale and theme through labelled controls', () => {
    renderWithProviders(<Header />);
    const language = screen.getByLabelText('Idioma');
    const theme = screen.getByLabelText('Tema');

    fireEvent.change(language, { target: { value: 'en' } });
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();

    fireEvent.change(theme, { target: { value: 'dark' } });
    expect(document.documentElement).toHaveClass('dark');
    expect(theme).toHaveValue('dark');
  });
});

describe('Footer', () => {
  it('replaces dead links with useful discovery endpoints', () => {
    renderWithProviders(<Footer />);
    const footer = screen.getByRole('contentinfo');
    const links = within(footer).getAllByRole('link').map((link) => link.getAttribute('href'));
    expect(links).toContain('/catalog.json');
    expect(links).toContain('/llms.txt');
    expect(links).toContain('https://github.com/engffsantos/design-resources-hub/issues/new');
    expect(links).not.toContain('#');
    expect(links.some((href) => href === 'https://twitter.com')).toBe(false);
  });
});
