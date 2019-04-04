const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    react: './src/index.js',
    libs: './src/js/common.js',
    profile: './src/js/profile.js',
    deliver: './src/js/deliver.js',
  },

  output: {
    path: __dirname + '/public/js',
    filename: '[name].js',
    library: "[name]"
  },

  watch: true,

  watchOptions:{
    aggregateTimeout: 100
  },

  devtool: NODE_ENV == "development" ? "cheap-inline-module-source-map" : null,

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

  resolve: {
    modules: ['src','node_modules'],
    extensions: ['.js','jsx']
  },

  plugins: [
        new webpack.DefinePlugin({
           'process.env.NODE_ENV': JSON.stringify("NODE_ENV")
         }),
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: "common"
        // })
    ]
};
if(NODE_ENV == "production"){
  modules.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  )
}