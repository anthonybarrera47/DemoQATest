import cypressPlugin from 'eslint-plugin-cypress';

export default [
  cypressPlugin.configs.recommended,
  {
    files: ['cypress/**/*.js'],
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'cypress/no-unnecessary-waiting': 'warn',
      'cypress/assertion-before-screenshot': 'warn',
      'cypress/no-force': 'off',
    },
  },
];
