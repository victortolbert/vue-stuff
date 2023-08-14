module.exports = {
  root: true,
  extends: [
    '@antfu',
    '@unocss',
    'plugin:storybook/recommended',
  ],
  rules: {
    'no-alert': 'off',
    'no-console': 'off',
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
