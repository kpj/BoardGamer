'use strict'

let ReactToHtmlPlugin = require('react-to-html-webpack-plugin')

module.exports = {
  entry: [
    'babel-polyfill',
    './app/index.jsx'
  ],
  output: {
    filename: 'index.js',
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
  plugins: [
    new ReactToHtmlPlugin('index.html', 'index.js')
  ]
}
