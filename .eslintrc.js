module.exports = {
    extends: ['next/core-web-vitals'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
    },
    overrides: [
      {
        files: ['**/app/api/**/*.ts'],
        rules: {
          '@typescript-eslint/no-explicit-any': 'off',
          '@typescript-eslint/ban-types': 'off',
        },
      },
    ],
    ignorePatterns: ['src/app/api/**/*.ts'],
  };