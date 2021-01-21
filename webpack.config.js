/*
 * @Author: your name
 * @Date: 2020-10-24 22:13:23
 * @LastEditTime: 2020-10-29 15:47:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tencentcloud-monitor-grafana-app/webpack.config.js
 */
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  node: {
    fs: 'empty',
  },
  context: path.join(__dirname, 'src'),
  devtool: 'source-map',
  entry: {
    './module': './module.ts',
    'components/config': './components/config.ts',
    'datasource/module': './datasource/module.ts',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
    library: 'MyLibrary',
    libraryTarget: 'amd'
  },
  externals: [
    'lodash', 'moment', 'angular',
    function(context, request, callback) {
      var prefix = 'angular/';
      if (request.indexOf(prefix) === 0) {
        return callback(null, request.substr(prefix.length));
      }
      callback();
    },
    function(context, request, callback) {
      var prefix = 'grafana/';
      if (request.indexOf(prefix) === 0) {
        return callback(null, request.substr(prefix.length));
      }
      callback();
    }
  ],
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CopyWebpackPlugin([
      { from: '**/plugin.json' },
      { from: '**/*.html' },
      { from: 'dashboards/*' },
      { from: '../README.md' },
      { from: '**/img/*' },
    ]),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.html', '.css']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|external)/,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          'ts-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
        ],
      },
    ]
  }
}