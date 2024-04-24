const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
        serif: ['Roboto Condensed', ...defaultTheme.fontFamily.serif],
        mono: [...defaultTheme.fontFamily.mono],
      },
      colors: {
        ...colors,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
