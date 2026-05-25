/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a0a0a',       // near black
        secondary: '#f97316',     // orange-500
        accent: '#10b981',        // green (WhatsApp)
        surface: '#141414',       // dark card surface
        muted: '#6b7280',         // gray text
      },
      fontFamily: {
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};