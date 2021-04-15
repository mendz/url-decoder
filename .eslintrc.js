module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'html', 'prettier'],
  extends: [
    'react-app',
    'react-app/jest',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'object-shorthand': ['error', 'always'],
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
};
