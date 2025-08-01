/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000',
        white: '#fff',
        purple: `#BF5AF2`,
        yellow: `#FFD60A`,
        blue: `#0A84FF`,
        cyan: `#64D2FF`,
      },
    },
  },
  plugins: [],
};
