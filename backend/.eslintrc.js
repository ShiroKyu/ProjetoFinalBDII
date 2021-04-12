module.exports = {
  env: {
    es2021: true,
    node: true,
    // 'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  plugins: ['prettier', 'jest'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 0,
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'import/first': 0,
  },
};
