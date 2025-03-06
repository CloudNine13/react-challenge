import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      '@typescript-eslint/no-redeclare': 'off',
      'no-throw-literal': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-useless-escape': 'off',
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {
      globals: {
        module: 'readonly',
      },
    },
  },
  {
    ignores: [
      // Directories
      '.husky',
      '.vscode',
      'coverage',
      'gradle',
      'public',
      'node_modules',
      'build',
      'temp',
      '.gradle',
      '.eslintcache',
      '.idea',
      'logs',
      'pids',
      'lib-cov',
      '.nyc_output',
      '.grunt',
      'bower_components',
      'jspm_packages',
      'web_modules',
      '.npm',
      '.cache',
      '.parcel-cache',
      '.next',
      'out',
      '.nuxt',
      'dist',
      '.vuepress/dist',
      '.serverless',
      '.fusebox',
      '.dynamodb',
      '.yarn/cache',
      '.yarn/unplugged',
      '.yarn/build-state.yml',
      '.yarn/install-state.gz',
      '.pnp.*',

      // Files
      'yarn-error.log',
      '.DS_Store',
      'src/.DS_Store',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'lerna-debug.log*',
      'report',
      '*.pid',
      '*.seed',
      '*.pid.lock',
      '*.lcov',
      '.lock-wscript',
      '*.tsbuildinfo',
      '.node_repl_history',
      '*.tgz',
      '.yarn-integrity',
      '.env',
      '.env.test',
      '.tern-port',
      '.vscode-test',

      // Patterns
      '**/build/Release',
      '**/.rpt2_cache/',
      '**/.rts2_cache_cjs/',
      '**/.rts2_cache_es/',
      '**/.rts2_cache_umd/',
    ],
  },
];
