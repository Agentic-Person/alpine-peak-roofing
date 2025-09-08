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
        // Alpine Peak Brand Colors
        alpine: {
          // Primary blues (from bluey palette)
          'dark-blue': '#001d39',
          'dark-blue-2': '#002246', 
          'dark-blue-3': '#1a3a5c',
          'dark-blue-4': '#2d4f73',
          'dark-blue-5': '#44658a',
          
          // Light mode variations
          'light-blue': '#e6f2ff',
          'light-blue-2': '#cce5ff',
          'light-blue-3': '#99d6ff',
          'light-blue-4': '#66c7ff',
          'light-blue-5': '#3399ff',
          
          // Accent colors
          teal: '#36b0d9',
          'teal-light': '#5cc4e5',
          'teal-dark': '#2891b3',
          
          purple: '#2D1B69',
          'purple-light': '#5d4aa1',
          'purple-dark': '#1e1247',
        },
        
        // Semantic colors
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
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
        
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        
        // Neutral colors for text hierarchy
        neutral: {
          0: '#ffffff',
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        
        // Background colors
        background: {
          primary: 'var(--background-primary)',
          secondary: 'var(--background-secondary)',
          tertiary: 'var(--background-tertiary)',
          inverse: 'var(--background-inverse)',
        },
        
        // Text colors
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          inverse: 'var(--text-inverse)',
          muted: 'var(--text-muted)',
        },
        
        // Border colors
        border: {
          primary: 'var(--border-primary)',
          secondary: 'var(--border-secondary)',
          focus: 'var(--border-focus)',
        },
        
        // Interactive colors
        interactive: {
          primary: 'var(--interactive-primary)',
          'primary-hover': 'var(--interactive-primary-hover)',
          secondary: 'var(--interactive-secondary)',
          'secondary-hover': 'var(--interactive-secondary-hover)',
        },
      },
      
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      
      backgroundImage: {
        'alpine-gradient': 'var(--alpine-gradient)',
        'hero-gradient': 'var(--hero-gradient)',
        'teal-gradient': 'var(--teal-gradient)',
        'purple-gradient': 'var(--purple-gradient)',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
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