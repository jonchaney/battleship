const path = require('path');
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: './src/entry.js',
  output: {
    path: path.resolve(__dirname, 'assets', 'js'),
    filename: './bundle.js'
  },
  resolve: {
    extensions: ['.js', '*']
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-maps'
};