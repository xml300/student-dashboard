import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Indigo 600
        secondary: '#EC4899', // Pink 500
        accent: '#10B981', // Emerald 500
        background: '#F9FAFB', // Gray 50
        surface: '#FFFFFF', // White
        border: '#E5E7EB', // Gray 200
        text: {
          DEFAULT: '#374151', // Gray 700
          light: '#6B7280', // Gray 500
        },
      },
      boxShadow: {
        'custom-light': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'custom-medium': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'custom-heavy': '0 10px 15px rgba(0, 0, 0, 0.15)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Lexend Deca', 'sans-serif'], // A more modern display font
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
export default config
