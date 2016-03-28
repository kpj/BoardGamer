'use strict'

let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    'babel-polyfill',
    './app/index.jsx'
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    library: 'Board',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        include: __dirname + '/app',
        test: /\.jsx?$/,
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html'
  })]
}
