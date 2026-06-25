/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        primary: '#72DB73',
        panel: '#1F1F1F',
        ink: '#FFFFFF',
        text: '#FFFFFF',
      },
      borderRadius: {
        app: '16px',
      },
      boxShadow: {
        panel: '0 18px 50px rgba(0, 0, 0, 0.32)',
        glow: '0 0 0 3px rgba(114, 219, 115, 0.85), 0 12px 28px rgba(114, 219, 115, 0.2)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
