const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack');

module.exports = {
  entry: {
    react: './src/index.js',
    libs: './src/js/common.js',
    profile: './src/js/profile.js'
  },
  output: {
    path: __dirname + '/public/js',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      }
    ]
  },
  plugins: [
        new UglifyJsPlugin({
          test: /\.js($|\?)/i
        }),
        new webpack.DefinePlugin({
           'process.env.NODE_ENV': JSON.stringify('production')
         }),
        new webpack.optimize.UglifyJsPlugin({
          
        })
    ],
  target: 'node'
};
