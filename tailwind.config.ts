import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Alpine Peak Brand Colors (AI theme)
        brand: {
          navy: '#003399',
          primary: '#0033CC',
          blue: '#0066CC',
          sky: '#33CCFF',
          gold: '#FFCC00'
        },

        // Alpine semantic palette (roofing theme)
        alpine: {
          'dark-blue': '#001d39',
          'dark-blue-2': '#002246',
          'dark-blue-3': '#1a3a5c',
          'dark-blue-4': '#2d4f73',
          'dark-blue-5': '#44658a',
          'light-blue': '#e6f2ff',
          'light-blue-2': '#cce5ff',
          'light-blue-3': '#99d6ff',
          'light-blue-4': '#66c7ff',
          'light-blue-5': '#3399ff',
          teal: '#36b0d9',
          'teal-light': '#5cc4e5',
          'teal-dark': '#2891b3',
          purple: '#2D1B69',
          'purple-light': '#5d4aa1',
          'purple-dark': '#1e1247',
        },

        // Semantic design system (CSS variable-based)
        background: {
          primary: 'var(--background-primary)',
          secondary: 'var(--background-secondary)',
          tertiary: 'var(--background-tertiary)',
          inverse: 'var(--background-inverse)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          inverse: 'var(--text-inverse)',
          muted: 'var(--text-muted)',
        },
        border: {
          primary: 'var(--border-primary)',
          secondary: 'var(--border-secondary)',
          focus: 'var(--border-focus)',
        },
        interactive: {
          primary: 'var(--interactive-primary)',
          'primary-hover': 'var(--interactive-primary-hover)',
          secondary: 'var(--interactive-secondary)',
          'secondary-hover': 'var(--interactive-secondary-hover)',
          default: '#36B0D9',
          hover: '#33CCFF',
          active: '#2A8CB0',
        },

        // Semantic status colors
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          light: '#34D399',
          DEFAULT: '#00CC00',
          500: '#10b981',
          600: '#059669',
          dark: '#047857',
          700: '#047857',
          900: '#064e3b',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          900: '#7f1d1d',
        },
        accent: {
          'gold-light': '#FCD34D',
          'gold': '#FFCC00',
          'gold-dark': '#D97706',
          'orange-light': '#FB923C',
          'orange': '#FF9900',
          'orange-dark': '#EA580C',
        },
      },

      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },

      backgroundImage: {
        // Roofing theme gradients
        'alpine-gradient': 'var(--alpine-gradient)',
        'hero-gradient': 'var(--hero-gradient)',
        'teal-gradient': 'var(--teal-gradient)',
        'purple-gradient': 'var(--purple-gradient)',
        // Brand gradients (AI theme)
        'brand-header': 'linear-gradient(to right, #0066CC, #003399)',
        'brand-header-invert': 'linear-gradient(to right, #003399, #0066CC)',
        'brand-navy-sky': 'linear-gradient(to right, #003399, #33CCFF)',
        'brand-vertical': 'linear-gradient(to bottom, #0066CC, #003399)',
        'brand-vertical-invert': 'linear-gradient(to bottom, #003399, #0066CC)',
        'ai-tools': 'linear-gradient(to right, #9333EA, #213FB0)',
        'ai-tools-horizontal': 'linear-gradient(to bottom, #9333EA, #213FB0)',
      },

      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
