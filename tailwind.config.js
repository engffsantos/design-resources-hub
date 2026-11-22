/** @type {import('tailwindcss').Config} */
const withAlpha = (variable) => `rgb(var(${variable}) / <alpha-value>)`;

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: withAlpha('--color-background'),
        foreground: withAlpha('--color-foreground'),
        card: {
          DEFAULT: withAlpha('--color-card'),
          foreground: withAlpha('--color-card-foreground'),
        },
        muted: {
          DEFAULT: withAlpha('--color-muted'),
          foreground: withAlpha('--color-muted-foreground'),
        },
        primary: {
          DEFAULT: withAlpha('--color-primary'),
          foreground: withAlpha('--color-primary-foreground'),
        },
        secondary: {
          DEFAULT: withAlpha('--color-secondary'),
          foreground: withAlpha('--color-secondary-foreground'),
        },
        accent: {
          DEFAULT: withAlpha('--color-accent'),
          foreground: withAlpha('--color-accent-foreground'),
        },
        border: withAlpha('--color-border'),
        input: withAlpha('--color-input'),
        ring: withAlpha('--color-ring'),
        destructive: {
          DEFAULT: withAlpha('--color-destructive'),
          foreground: withAlpha('--color-destructive-foreground'),
        },
        success: {
          DEFAULT: withAlpha('--color-success'),
          foreground: withAlpha('--color-success-foreground'),
        },
        warning: {
          DEFAULT: withAlpha('--color-warning'),
          foreground: withAlpha('--color-warning-foreground'),
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { '0%': { opacity: '0', transform: 'translateY(-10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
