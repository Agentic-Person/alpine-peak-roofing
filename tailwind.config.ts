import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        // ── Denver Blue Core Palette ──────────────────────────────────────
        // Sky Captain (dark navy) — nav, heroes, footers
        // Azure (medium blue)    — buttons, sections, borders
        // Cornflower (bright)    — icons, hover, highlights
        // Amber Gold             — CTAs, stars, trust badges
        // Warm Slate             — body text, card surfaces

        // New canonical names
        'sky-captain': {
          DEFAULT: '#004080',
          deep:    '#002D5A',
          mid:     '#005FA3',
        },
        azure: {
          dark:    '#005FA3',
          DEFAULT: '#0077CC',
          light:   '#2299EE',
        },
        cornflower: {
          DEFAULT: '#5599FF',
          light:   '#88BBFF',
          pale:    '#E0EEFF',
        },
        amber: {
          dark:    '#B88200',
          DEFAULT: '#E5A800',
          light:   '#FFD050',
          pale:    '#FFF3CC',
        },
        slate: {
          dark:    '#2D3A4A',
          DEFAULT: '#4A5C6A',
          mid:     '#607D8E',
          light:   '#A0B4C4',
          pale:    '#E8EFF4',
        },
        ink: {
          DEFAULT: '#1A2332',
          mid:     '#2D3E52',
        },
        'off-white': '#F0F6FF',

        // ── Legacy names kept for component backward-compat ───────────────
        // Values now point to Denver Blue equivalents
        forest: {
          deep:    '#004080',   // nav, heroes       (was dark green)
          mid:     '#0077CC',   // sections, accents (was mid green)
          light:   '#5599FF',   // hover states      (was light green)
          lighter: '#88BBFF',   // soft accent       (was softer green)
          pale:    '#E0EEFF',   // subtle tints      (was pale green)
        },
        cedar: {
          dark:    '#002D5A',   // deepest           (was darkest brown)
          DEFAULT: '#4A5C6A',   // warm slate        (was warm brown)
          mid:     '#607D8E',   // slate mid         (was mid brown)
          light:   '#88BBFF',   // cornflower lt     (was sandstone)
        },
        sandstone: {
          dark:    '#0077CC',   // azure             (was deep sandstone)
          DEFAULT: '#88BBFF',   // cornflower light  (was warm sandstone)
          mid:     '#A0B4C4',   // slate light       (was mid sandstone)
          light:   '#E0EEFF',   // cornflower pale   (was light sandstone)
          pale:    '#F0F6FF',   // off-white         (was cream)
        },
        gold: {
          dark:    '#B88200',   // amber dark        (was deep gold)
          DEFAULT: '#E5A800',   // amber gold        (was mountain gold)
          light:   '#FFD050',   // amber light       (was bright gold)
          pale:    '#FFF3CC',   // amber pale        (was very light gold)
        },
        cream: {
          DEFAULT: '#FFFFFF',   // white             (was warm cream)
          dark:    '#F0F6FF',   // off-white         (was cream dark)
        },
        charcoal: {
          DEFAULT: '#1A2332',   // ink               (was near-black warm)
          mid:     '#2D3E52',   // ink mid           (was dark brown-black)
          light:   '#4A5C6A',   // warm slate        (was warm stone)
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
          primary:             'var(--interactive-primary)',
          'primary-hover':     'var(--interactive-primary-hover)',
          secondary:           'var(--interactive-secondary)',
          'secondary-hover':   'var(--interactive-secondary-hover)',
          gold:                'var(--interactive-gold)',
          'gold-hover':        'var(--interactive-gold-hover)',
        },

        // ── AI Brand (unified with Denver Blue) ──────────────────────────
        brand: {
          navy:    '#004080',
          primary: '#0077CC',
          blue:    '#0077CC',
          sky:     '#5599FF',
          gold:    '#E5A800',
        },
        alpine: {
          'dark-blue':   '#002D5A',
          'dark-blue-2': '#004080',
          'dark-blue-3': '#005FA3',
          'dark-blue-4': '#0077CC',
          'dark-blue-5': '#2299EE',
          'light-blue':  '#E0EEFF',
          'light-blue-2':'#CCE0FF',
          'light-blue-3':'#88BBFF',
          'light-blue-4':'#6699FF',
          'light-blue-5':'#5599FF',
          teal:          '#0077CC',
          'teal-light':  '#5599FF',
          'teal-dark':   '#004080',
          purple:        '#002D5A',
          'purple-light':'#004080',
          'purple-dark': '#001A3A',
        },

        // ── Status colors (universal — unchanged) ────────────────────────
        success: {
          50:      '#ecfdf5',
          100:     '#d1fae5',
          light:   '#34D399',
          DEFAULT: '#00CC00',
          500:     '#10b981',
          600:     '#059669',
          dark:    '#047857',
          700:     '#047857',
          900:     '#064e3b',
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
        // Denver Blue gradients
        'hero-mountain':      'var(--hero-gradient)',
        'navy-gradient':      'var(--navy-gradient)',
        'azure-gradient':     'var(--azure-gradient)',
        'gold-gradient':      'var(--gold-gradient)',
        'section-gradient':   'var(--section-gradient)',
        'dark-section':       'var(--dark-section-gradient)',
        // Legacy names (point to new values via CSS vars)
        'forest-gradient':    'var(--forest-gradient)',
        'cedar-gradient':     'var(--cedar-gradient)',
        // AI brand gradients (unified)
        'alpine-gradient':    'var(--alpine-gradient)',
        'hero-gradient':      'var(--hero-gradient-blue)',
        'teal-gradient':      'var(--teal-gradient)',
        'purple-gradient':    'var(--purple-gradient)',
        'brand-header':       'linear-gradient(to right, #0077CC, #004080)',
        'brand-header-invert':'linear-gradient(to right, #004080, #0077CC)',
        'brand-navy-sky':     'linear-gradient(to right, #004080, #5599FF)',
        'brand-vertical':     'linear-gradient(to bottom, #0077CC, #004080)',
        'brand-vertical-invert':'linear-gradient(to bottom, #004080, #0077CC)',
        'ai-tools':           'linear-gradient(to right, #0077CC, #004080)',
        'ai-tools-horizontal':'linear-gradient(to bottom, #0077CC, #004080)',
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
        'craftsman':    '0 2px 16px rgba(0,64,128,0.08)',
        'craftsman-md': '0 6px 24px rgba(0,64,128,0.12)',
        'craftsman-lg': '0 12px 40px rgba(0,64,128,0.16)',
        'gold':         '0 8px 24px rgba(229,168,0,0.35)',
        'gold-lg':      '0 16px 48px rgba(229,168,0,0.50)',
        'forest':       '0 8px 24px rgba(0,64,128,0.30)',
      },

      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}

export default config
