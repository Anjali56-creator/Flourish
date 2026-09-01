/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Clash Display"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#0e1116',
          soft: '#1a1f27',
        },
        brand: {
          50: '#eefdf6',
          100: '#d5f9e8',
          200: '#aef0d3',
          300: '#77e2b8',
          400: '#3fcb99',
          500: '#18b083',
          600: '#0c8f6b',
          700: '#0b7258',
          800: '#0d5a48',
          900: '#0c4a3d',
        },
        grape: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        sun: {
          400: '#fbbf68',
          500: '#f59e2c',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 2px 12px -2px rgba(16,24,40,0.08), 0 6px 30px -10px rgba(16,24,40,0.12)',
        lift: '0 10px 40px -12px rgba(16,24,40,0.22)',
        glow: '0 0 0 1px rgba(24,176,131,0.25), 0 12px 40px -12px rgba(24,176,131,0.35)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '60%': { transform: 'scale(1.08)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both',
        'scale-in': 'scale-in 0.35s cubic-bezier(0.22,1,0.36,1) both',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 1.6s infinite',
        pop: 'pop 0.4s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
};
