/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep prestige emerald derived from logo
        forest: {
          50: '#F2F8F5',
          100: '#E2F0EA',
          200: '#C4E1D4',
          300: '#9BCCB7',
          400: '#69B093',
          500: '#419273',
          600: '#2C755A',
          700: '#225E49',
          800: '#1B4B3B',
          900: '#0E3528',
          950: '#07241A',
        },
        // Rich warm gold derived from logo leaf highlight
        gold: {
          50: '#FDFBF5',
          100: '#F9F4E3',
          200: '#F2E6C2',
          300: '#E8D499',
          400: '#DCBD6B',
          500: '#CFA744',
          600: '#B88B32',
          700: '#946B26',
          800: '#7A5623',
          900: '#674720',
          950: '#3D260D',
        },
        // Luxury warm light background tones
        sand: {
          50: '#FDFCF9',
          100: '#FAF8F3',
          200: '#F4EFE6',
          300: '#EAE2D3',
          400: '#D8CCA8',
          500: '#BAA784',
          600: '#A4906C',
          700: '#877454',
          800: '#6E5E45',
          900: '#5A4D3A',
        },
        warmwhite: '#FCFBF8',
        ivory: '#F9F7F2',
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 40px -10px rgba(14, 53, 40, 0.08)',
        'luxury-hover': '0 20px 50px -12px rgba(14, 53, 40, 0.16)',
        'glow-gold': '0 8px 30px -4px rgba(207, 167, 68, 0.35)',
        'card-soft': '0 4px 25px 0 rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
