/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#080808',
        surface: {
          DEFAULT: '#111111',
          elevated: '#171717',
          card: '#141414',
          subtle: '#1C1C1E',
        },
        border: {
          subtle: '#222222',
          DEFAULT: '#27272A',
          hover: '#3F3F46',
        },
        accent: {
          DEFAULT: '#E8590C', // Refined Ember Accent
          hover: '#F06529',
          muted: 'rgba(232, 89, 12, 0.15)',
          glow: 'rgba(232, 89, 12, 0.25)',
        },
        foreground: {
          DEFAULT: '#F4F4F5',
          muted: '#8E8E93',
          dim: '#52525B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      }
    },
  },
  plugins: [],
}
