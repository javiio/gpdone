/* eslint-disable */
const path = require('path');

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer';
    }

    return config;
  },
  resolve: {
    alias: {
      '~blocks': path.resolve(__dirname, './libs/blocks'),
      '~platform': path.resolve(__dirname, './libs/platform'),
      '~projects': path.resolve(__dirname, './libs/projects'),
    }
  }
};
