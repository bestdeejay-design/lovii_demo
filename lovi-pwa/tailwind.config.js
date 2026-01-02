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
        'text-secondary': '#4B5563',
        'text-muted': '#6B7280',
        'border-color': '#D1D5DB',
        success: '#10B981',
        error: '#EF4444',
      }
    },
  },
  plugins: [],
}