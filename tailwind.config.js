/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cricket-red': '#D71920',
        'cricket-red-dark': '#A80F18',
        'cricket-black': '#171717',
        'cricket-charcoal': '#242424',
        'cricket-light': '#F5F4F0',
        'cricket-green': '#315C2B',
        'cricket-gray': '#777777',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0)' } },
        slideInLeft: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(0)' } },
      },
    },
  },
  safelist: [
    { pattern: /from-(amber|red|slate|blue|gray|emerald|indigo|zinc|teal|green)-(500|600|700|800|900|950)/ },
    { pattern: /to-(amber|red|slate|blue|gray|emerald|indigo|zinc|teal|green)-(500|600|700|800|900|950)/ },
    { pattern: /via-(amber|red|slate|blue|gray|emerald|indigo|zinc|teal|green)-(500|600|700|800|900|950)/ },
  ],
  plugins: [],
}
