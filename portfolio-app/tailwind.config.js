/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Outfit'", 'system-ui', 'sans-serif'],
        heading: ["'Space Grotesk'", 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient': 'rotateGradient 3s ease infinite',
        'float': 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
