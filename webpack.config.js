const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
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

    new CopyPlugin([
      { from: 'src/cv_2021-05-29.pdf', to: 'cv_2021-05-29.pdf' },
    ]),
  ],
});
