const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
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
      backgroundColor: ['readonly'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addVariant, e }) {
      addVariant('readonly', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`readonly${separator}${className}`)}:read-only`;
        });
      });
    }),
  ],
};
