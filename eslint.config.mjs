import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  prettier,
  {
    plugins: {
      ['@typescript-eslint']: tseslint.plugin,
    },
  },
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.es2020,
        ...globals.node,
      },
    },
    rules: {
      'prettier/prettier': [
        'error',
        { endOfLine: 'auto', singleQuote: true, trailingComma: 'all' },
      ],
      'object-curly-spacing': ['error', 'always'],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-unused-vars': 'off',
      'no-console': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/no-namespace': 'off',
    },
  },
);
