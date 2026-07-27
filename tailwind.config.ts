import type { Config } from 'tailwindcss';

/**
 * Penny & Planet — Global Design System
 * -------------------------------------
 * This file is the single source of truth for the visual identity of the
 * entire site. Every future page/component must consume these tokens
 * rather than introducing new colors, fonts, spacing, or radii ad hoc.
 *
 * Palette rationale:
 *  - forest  → primary brand color (finance = grounded, trustworthy; also reads as "growth")
 *  - earth   → secondary/warm accent (sustainability, human warmth)
 *  - gold    → muted accent for highlights, ratings, premium moments (used sparingly)
 *  - sage    → soft accent for badges/backgrounds tied to "eco" content
 *  - sand    → warm neutral background scale (replaces cold grays)
 *  - ink     → near-black, green-tinted text color (never pure black)
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '2rem',
        lg: '2.5rem',
        xl: '3rem',
      },
    },
    extend: {
      colors: {
        forest: {
          50: '#F0F5F2',
          100: '#DCEAE1',
          200: '#B9D5C4',
          300: '#8FBAA0',
          400: '#5F9678',
          500: '#3D6B52',
          600: '#2C5540',
          700: '#1F3D2E',
          800: '#16281F',
          900: '#0F1C16',
        },
        earth: {
          50: '#FBF3EE',
          100: '#F5E1D3',
          200: '#E9C2A6',
          300: '#DBA179',
          400: '#C9835A',
          500: '#B3714B',
          600: '#95573A',
          700: '#78432D',
        },
        gold: {
          50: '#FBF7EC',
          100: '#F3E7C6',
          200: '#E6CE93',
          300: '#D6B468',
          400: '#BFA05C',
          500: '#A9863F',
          600: '#8A6B30',
        },
        sage: {
          50: '#F4F7F3',
          100: '#E4ECE1',
          200: '#C9D9C3',
          300: '#A8BFA0',
          400: '#87A57C',
          500: '#6C8A61',
        },
        sand: {
          50: '#FDFCF9',
          100: '#FAF8F3',
          200: '#F2EFE6',
          300: '#E8E3D6',
          400: '#D9D2BE',
        },
        ink: {
          DEFAULT: '#1C2A22',
          soft: '#3A473F',
          muted: '#5C685F',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'ui-serif', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Editorial type scale tuned for long-form reading
        'display-xl': ['4rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-md': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'body-lg': ['1.1875rem', { lineHeight: '1.75' }],
        'body-base': ['1.0625rem', { lineHeight: '1.7' }],
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.14em' }],
      },
      borderRadius: {
        sm: '0.375rem',
        DEFAULT: '0.625rem',
        md: '0.875rem',
        lg: '1.25rem',
        xl: '1.75rem',
        full: '9999px',
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgb(28 42 34 / 0.04), 0 1px 3px 0 rgb(28 42 34 / 0.06)',
        card: '0 2px 8px -2px rgb(28 42 34 / 0.08), 0 8px 24px -8px rgb(28 42 34 / 0.10)',
        raised: '0 12px 32px -12px rgb(28 42 34 / 0.20)',
        focus: '0 0 0 3px rgb(61 107 82 / 0.35)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      maxWidth: {
        prose: '42rem',
        'content-narrow': '48rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fadeIn 0.5s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
