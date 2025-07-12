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
  darkMode: 'class', // Enable dark mode based on class
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ]
}
export default config
>>>>>>> 89af23dbb9007f91ba737715a825608d4b6da105
