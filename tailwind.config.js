const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        '590px': '590px',
      },
      width: {
        '610px': '610px',
      },
    },
    fontFamily: {
      sans: [...defaultTheme.fontFamily.sans],
      serif: ['Roboto Condensed', ...defaultTheme.fontFamily.serif],
      mono: [...defaultTheme.fontFamily.mono],
    },
    colors: {
      ...colors,
    },
  },
  variants: {
    extend: {
      margin: ['first'],
      backgroundColor: ['readonly'],
    },
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant('readonly', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`readonly${separator}${className}`)}:read-only`;
        });
      });
    }),
  ],
};
