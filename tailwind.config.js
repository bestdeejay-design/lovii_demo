/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066FF',
        accent: '#FF6B00',
        background: '#FFFFFF',
        text: '#1F2937',
      },
    },
  },
  plugins: [],
}