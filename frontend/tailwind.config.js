/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#f8fafc',
        card: '#ffffff',
        primary: '#16a34a',
        'primary-hover': '#15803d',
        secondary: '#f59e0b',
        'secondary-text': '#475569',
      }
    },
  },
  plugins: [],
}
