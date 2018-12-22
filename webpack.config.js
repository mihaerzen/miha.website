const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { default: RobotstxtPlugin } = require('robotstxt-webpack-plugin');

module.exports = env => ({
  mode: env === 'production' ? 'production' : 'development',
  devtool: env === 'production' ? '' : 'source-map',
  target: 'web',
  output: {
    filename: '[name].[hash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('src/index.html'),
    }),

    new RobotstxtPlugin({
      policy: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    }),
  ],
});
