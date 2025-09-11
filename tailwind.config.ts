import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Alpine Peak Brand Colors
        brand: {
          navy: '#003399',
          primary: '#0033CC', 
          blue: '#0066CC',
          sky: '#33CCFF',
          gold: '#FFCC00'
        },
        // Text Colors
        text: {
          primary: '#FFFFFF',
          'off-white': '#C7E1FC',
          body: '#DDDDDD',
          secondary: '#9AB6E0',
          muted: '#596D8C'
        },
        // Interactive Colors
        interactive: {
          default: '#36B0D9',
          hover: '#33CCFF',
          active: '#2A8CB0'
        },
        // Success Colors
        success: {
          light: '#34D399',
          DEFAULT: '#00CC00',
          dark: '#059669'
        },
        // Accent Colors
        accent: {
          'gold-light': '#FCD34D',
          'gold': '#FFCC00',
          'gold-dark': '#D97706',
          'orange-light': '#FB923C',
          'orange': '#FF9900',
          'orange-dark': '#EA580C'
        }
      },
      backgroundImage: {
        // Brand Gradients
        'brand-header': 'linear-gradient(to right, #0066CC, #003399)',
        'brand-header-invert': 'linear-gradient(to right, #003399, #0066CC)',
        'brand-navy-sky': 'linear-gradient(to right, #003399, #33CCFF)',
        'brand-vertical': 'linear-gradient(to bottom, #0066CC, #003399)',
        'brand-vertical-invert': 'linear-gradient(to bottom, #003399, #0066CC)',
        'ai-tools': 'linear-gradient(to right, #9333EA, #213FB0)'
      }
    },
  },
  plugins: [],
};

export default config;