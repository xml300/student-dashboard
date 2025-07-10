<<<<<<< HEAD
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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'card-background': 'var(--card-background)',
        'primary-accent': 'var(--primary-accent)',
        'secondary-accent': 'var(--secondary-accent)',
        'border-color': 'var(--border-color)',
        'accent': 'var(--accent)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
=======
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
>>>>>>> 89af23dbb9007f91ba737715a825608d4b6da105
      },
    },
  },
  plugins: [],
<<<<<<< HEAD
};

export default config;
=======
}
export default config
>>>>>>> 89af23dbb9007f91ba737715a825608d4b6da105
