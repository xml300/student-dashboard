import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-1)',
        foreground: 'var(--foreground)',
        'primary-accent': 'var(--color-2)',
        'secondary-accent': 'var(--color-3)',
        'border-color': 'var(--border-color)',
      },
    },
  },
  plugins: [],
};

export default config;
