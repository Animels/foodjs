import mainConfig from '../eslint.config.js';

export default [
  ...mainConfig,
  {
    languageOptions: {
      globals: {
        browser: true,
      },
    },
  },
];
