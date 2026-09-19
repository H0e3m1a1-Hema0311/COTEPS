import tseslint from 'typescript-eslint';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

console.log('tseslint.recommendedTypeChecked length', tseslint.configs.recommendedTypeChecked.length);
console.log('tseslint.recommendedTypeChecked[0] keys', Object.keys(tseslint.configs.recommendedTypeChecked[0]));
console.log('tseslint.recommendedTypeChecked[0].languageOptions keys', tseslint.configs.recommendedTypeChecked[0].languageOptions ? Object.keys(tseslint.configs.recommendedTypeChecked[0].languageOptions) : 'none');
console.log('tseslint.recommendedTypeChecked[0].languageOptions.parser', tseslint.configs.recommendedTypeChecked[0].languageOptions?.parser?.name || tseslint.configs.recommendedTypeChecked[0].languageOptions?.parser);
console.log('tsPlugin.configs.recommended keys', Object.keys(tsPlugin.configs.recommended));
console.log('tsPlugin.configs.recommended.extends', tsPlugin.configs.recommended.extends);
console.log('tsPlugin languageOptions', tsPlugin.configs.recommended.languageOptions ? Object.keys(tsPlugin.configs.recommended.languageOptions) : 'none');
console.log('tsParser type', typeof tsParser);
console.log('js.configs.recommended keys', Object.keys(js.configs.recommended));
console.log('reactHooks.configs.flat.recommended keys', Object.keys(reactHooks.configs.flat.recommended));
console.log('reactRefresh.configs.vite keys', Object.keys(reactRefresh.configs.vite));
console.log('reactRefresh.configs.vite.extends', reactRefresh.configs.vite.extends);
const walk = (value, path) => {
  if (value && typeof value === 'object') {
    if (!Array.isArray(value) && Object.prototype.hasOwnProperty.call(value, 'parser')) {
      console.log('parser key at', path, value.parser);
    }
    if (Array.isArray(value)) {
      value.forEach((item, i) => walk(item, `${path}[${i}]`));
    } else {
      Object.entries(value).forEach(([k, v]) => walk(v, `${path}.${k}`));
    }
  }
};
const cfg = {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: ['./tsconfig.app.json', './tsconfig.node.json'],
      tsconfigRootDir: undefined,
    },
    globals: {},
  },
  extends: [
    js.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
  ],
};
walk(cfg, 'root');
console.log('done');
