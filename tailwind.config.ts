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
        // ── Mountain Craftsman Core Palette ──────────────────────────────
        forest: {
          deep:    '#1A3D2B',   // dark forest green — nav, heroes
          mid:     '#2E6B4A',   // medium green — accents, sections
          light:   '#4A9B6E',   // lighter green — hover states
          lighter: '#7DC0A0',   // soft green — backgrounds
          pale:    '#D0E8DA',   // near-white green — subtle tints
        },
        cedar: {
          dark:    '#4A2010',   // very dark brown — deepest
          DEFAULT: '#6B3A1F',   // warm dark brown — headings
          mid:     '#9B5A35',   // medium brown
          light:   '#C4956A',   // sandstone
        },
        sandstone: {
          dark:    '#B5845A',   // deep sandstone
          DEFAULT: '#C4956A',   // warm sandstone — card backgrounds
          mid:     '#D9B899',   // mid sandstone
          light:   '#E8D5BE',   // light sandstone — section backgrounds
          pale:    '#FAF7F2',   // cream — main background
        },
        gold: {
          dark:    '#A88B20',   // deep gold — shadows, borders
          DEFAULT: '#D4AF37',   // mountain gold — CTA, highlights
          light:   '#F0D060',   // bright gold — hover states
          pale:    '#FDF0A0',   // very light gold — tints
        },
        cream: {
          DEFAULT: '#FAF7F2',   // warm cream — primary background
          dark:    '#F0EAE0',   // cream dark — secondary background
        },
        charcoal: {
          DEFAULT: '#1C1208',   // near-black warm
          mid:     '#3D2E1A',   // dark brown-black
          light:   '#6B5C48',   // warm stone
        },

        // ── Semantic CSS-variable tokens ─────────────────────────────────
        background: {
          primary:   'var(--background-primary)',
          secondary: 'var(--background-secondary)',
          tertiary:  'var(--background-tertiary)',
          inverse:   'var(--background-inverse)',
          dark:      'var(--background-dark)',
        },
        text: {
          primary:   'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary:  'var(--text-tertiary)',
          inverse:   'var(--text-inverse)',
          muted:     'var(--text-muted)',
          gold:      'var(--text-gold)',
          forest:    'var(--text-forest)',
        },
        border: {
          primary:   'var(--border-primary)',
          secondary: 'var(--border-secondary)',
          focus:     'var(--border-focus)',
          forest:    'var(--border-forest)',
        },
        interactive: {
          primary:        'var(--interactive-primary)',
          'primary-hover':'var(--interactive-primary-hover)',
          secondary:      'var(--interactive-secondary)',
          'secondary-hover':'var(--interactive-secondary-hover)',
          gold:           'var(--interactive-gold)',
          'gold-hover':   'var(--interactive-gold-hover)',
        },

        // ── AI Brand Colors (for /ai-tools page — kept) ─────────────────
        brand: {
          navy:    '#003399',
          primary: '#0033CC',
          blue:    '#0066CC',
          sky:     '#33CCFF',
          gold:    '#FFCC00',
        },
        alpine: {
          'dark-blue':  '#001d39',
          'dark-blue-2':'#002246',
          'dark-blue-3':'#1a3a5c',
          'dark-blue-4':'#2d4f73',
          'dark-blue-5':'#44658a',
          'light-blue': '#e6f2ff',
          'light-blue-2':'#cce5ff',
          'light-blue-3':'#99d6ff',
          'light-blue-4':'#66c7ff',
          'light-blue-5':'#3399ff',
          teal:          '#36b0d9',
          'teal-light':  '#5cc4e5',
          'teal-dark':   '#2891b3',
          purple:        '#2D1B69',
          'purple-light':'#5d4aa1',
          'purple-dark': '#1e1247',
        },

        // ── Status colors ────────────────────────────────────────────────
        success: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          light:'#34D399',
          DEFAULT: '#00CC00',
          500: '#10b981',
          600: '#059669',
          dark:'#047857',
          700: '#047857',
          900: '#064e3b',
        },
        warning: {
          50:  '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          900: '#78350f',
        },
        error: {
          50:  '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          900: '#7f1d1d',
        },
      },

      fontFamily: {
        sans:    ['var(--font-lato)', 'Lato', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        serif:   ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        mono:    ['var(--font-geist-mono)', 'monospace'],
      },

      backgroundImage: {
        // Mountain Craftsman gradients
        'hero-mountain':      'var(--hero-gradient)',
        'forest-gradient':    'var(--forest-gradient)',
        'cedar-gradient':     'var(--cedar-gradient)',
        'gold-gradient':      'var(--gold-gradient)',
        'section-gradient':   'var(--section-gradient)',
        'dark-section':       'var(--dark-section-gradient)',
        // AI brand gradients (kept)
        'alpine-gradient':    'var(--alpine-gradient)',
        'hero-gradient':      'var(--hero-gradient-blue)',
        'teal-gradient':      'var(--teal-gradient)',
        'purple-gradient':    'var(--purple-gradient)',
        'brand-header':       'linear-gradient(to right, #0066CC, #003399)',
        'brand-header-invert':'linear-gradient(to right, #003399, #0066CC)',
        'brand-navy-sky':     'linear-gradient(to right, #003399, #33CCFF)',
        'brand-vertical':     'linear-gradient(to bottom, #0066CC, #003399)',
        'brand-vertical-invert':'linear-gradient(to bottom, #003399, #0066CC)',
        'ai-tools':           'linear-gradient(to right, #9333EA, #213FB0)',
        'ai-tools-horizontal':'linear-gradient(to bottom, #9333EA, #213FB0)',
      },

      animation: {
        'fade-in':       'fadeIn 0.5s ease-in-out',
        'fade-up':       'fadeInUp 0.7s ease both',
        'fade-left':     'fadeInLeft 0.7s ease both',
        'fade-right':    'fadeInRight 0.7s ease both',
        'scale-in':      'scaleIn 0.5s ease both',
        'slide-in':      'slideIn 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'spin-slow':     'spin-slow 8s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%':   { opacity: '0', transform: 'translateX(32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideIn: {
          '0%':   { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
      },

      boxShadow: {
        'craftsman':    '0 2px 16px rgba(107,58,31,0.10)',
        'craftsman-md': '0 6px 24px rgba(107,58,31,0.14)',
        'craftsman-lg': '0 12px 40px rgba(107,58,31,0.18)',
        'gold':         '0 8px 24px rgba(212,175,55,0.35)',
        'gold-lg':      '0 16px 48px rgba(212,175,55,0.5)',
        'forest':       '0 8px 24px rgba(26,61,43,0.35)',
      },

      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}

export default config
