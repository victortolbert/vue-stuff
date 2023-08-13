module.exports = {
  root: true,
  extends: ['@antfu', 'plugin:storybook/recommended'],
  rules: {
    'unused-imports/no-unused-vars': 'off',
  },
  overrides: [
    {
      files: [
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      ],
      extends: [
        'plugin:cypress/recommended',
      ],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
}
