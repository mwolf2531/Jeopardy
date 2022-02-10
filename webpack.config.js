const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        }
      }
    ]
  },
  devServer: {
    'static': {
      directory: './dist'
    }
  }
};