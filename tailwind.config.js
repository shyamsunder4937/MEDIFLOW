/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4ff',
          100: '#dbe4fe',
          200: '#bfd0fe',
          300: '#93b4fd',
          400: '#6090fa',
          500: '#3b6cf6',
          600: '#2550eb',
          700: '#1d3ed8',
          800: '#1e34af',
          900: '#1e2f8a',
          950: '#172054',
        },
        dark: {
          bg: '#0B0F19',
          card: '#111827',
          border: '#1F2937',
          hover: '#1E293B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(59, 130, 246, 0.3)',
        'glow-purple': '0 0 25px -5px rgba(168, 85, 247, 0.3)',
      }
    },
  },
  plugins: [],
}
