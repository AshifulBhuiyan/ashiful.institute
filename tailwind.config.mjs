/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        subtle: 'var(--color-subtle)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        hover: 'var(--color-hover)',
        border: 'var(--color-border)',
      },
    }
  }
};