// eslint.config.js
const nextConfig = require('next/eslint');

module.exports = {
  extends: [...nextConfig.extends],
  ignores: ['src/app/api/**/*.ts'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
  },
}; 