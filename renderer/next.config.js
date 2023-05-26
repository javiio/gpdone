/* eslint-disable */
const path = require('path');

module.exports = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(mp3)$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[path][name].[hash][ext]",
      },
    });

    if (!isServer) {
      config.target = 'electron-renderer';
    }

    return config;
  },
  resolve: {
    alias: {
      '~assets': path.resolve(__dirname, './assets'),
      '~blocks': path.resolve(__dirname, './libs/blocks'),
      '~platform': path.resolve(__dirname, './libs/platform'),
      '~projects': path.resolve(__dirname, './libs/projects'),
      '~planning': path.resolve(__dirname, './libs/planning'),
      '~notes': path.resolve(__dirname, './libs/notes'),
    }
  }
};
