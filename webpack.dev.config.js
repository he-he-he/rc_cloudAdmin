var path = require('path');
var webpack = require('webpack');
module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/app'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  externals: {

  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
    }, {
        test: /\.css/,
        loaders: ['style', 'css']
      }, {
        test: /\.less$/,
        loaders: ["style", "css", "less"]
      }]
  }
};