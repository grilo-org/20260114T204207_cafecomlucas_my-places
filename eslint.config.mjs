import eslint from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import esLintPluginReact from 'eslint-plugin-react'
import esLintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import esLintPluginJestDom from 'eslint-plugin-jest-dom'

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  esLintPluginReact.configs.flat.recommended,
  esLintPluginReact.configs.flat['jsx-runtime'],
  esLintPluginJestDom.configs['flat/recommended'],
  globalIgnores(['**/*.snap', 'src/graphql/generated/**']),
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { 'react-hooks': esLintPluginReactHooks },
    settings: {
      react: {
        version: 'detect'
      }
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node
      }
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
  }
])
