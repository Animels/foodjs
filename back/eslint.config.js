import mainConfig from '../eslint.config.js';

export default [
  ...mainConfig,
  {
    languageOptions: {
      globals: {
        node: true,
      },
    },
  },
];
