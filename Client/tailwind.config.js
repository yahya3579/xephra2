/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '14': '4.5rem',
      },
      width: {
        '22': '6rem',
      },

      colors: {
        'scrollbar-thumb': '#854951',
        'scrollbar-track': '#f1f1f1',
      },

      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        oldStandard: ['Old Standard TT', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        Poppins:['Poppins'],
      },

    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '::-webkit-scrollbar': {
          width: '12px',
          height: '12px',
        },
        '::-webkit-scrollbar-thumb': {
          borderRadius: '10px',
          backgroundColor: '#854951',
          backgroundImage: 'linear-gradient(90deg, transparent, transparent, transparent, transparent)',
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
          borderRadius: '10px',
        },
      });
    },
  ],
};
