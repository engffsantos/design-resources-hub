/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: '#09090B',
        foreground: '#FAFAFA',
        card: {
          DEFAULT: '#111113',
          foreground: '#FAFAFA',
        },
        muted: {
          DEFAULT: '#16161A',
          foreground: '#A1A1AA',
        },
        primary: {
          DEFAULT: '#10B981',
          foreground: '#09090B',
        },
        secondary: {
          DEFAULT: '#1E1E22',
          foreground: '#FAFAFA',
        },
        accent: {
          DEFAULT: '#2A2A2E',
          foreground: '#FAFAFA',
        },
        border: '#26262B',
        input: '#26262B',
        ring: '#10B981',
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FAFAFA',
        },
        backgroundLight: '#FAFAFA',
        foregroundLight: '#09090B',
        cardLight: '#FFFFFF',
        mutedLight: '#F4F4F5',
        borderLight: '#E4E4E7',
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
}
