module.exports = {
  extends: ['react-app', 'prettier'],
  rules: {
    'prettier/prettier': [
      0,
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 80,
        endOfLine: 'auto',
      },
    ],
  },
  globals: {
    chrome: true,
  },
  plugins: ['html', 'prettier'],
};
