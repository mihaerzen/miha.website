const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { default: RobotstxtPlugin } = require("robotstxt-webpack-plugin");

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('src/index.html'),
    }),

    new RobotstxtPlugin({
      policy: [
        {
          userAgent: "*",
          allow: "/",
        }
      ],
    }),
  ]
};
