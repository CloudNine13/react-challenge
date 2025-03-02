/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  extend: {
    theme: {
      fontFamily: {
        dmsans: ['DM Sans'],
      },
      colors: {
        blue: '#007bff',
      },
    },
  },
  plugins: [],
};
