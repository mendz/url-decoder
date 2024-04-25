module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'html', 'prettier', 'cypress'],
  extends: [
    'react-app',
    'react-app/jest',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': [
      'off',
      { allowArgumentsExplicitlyTypedAsAny: false },
    ],
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
  env: {
    'cypress/globals': true,
  },
  ignorePatterns: ['cypress/e2e/examples/**'],
};
