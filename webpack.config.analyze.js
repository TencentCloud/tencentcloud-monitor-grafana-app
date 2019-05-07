const webpackBundleAnalyzer = require('webpack-bundle-analyzer');
const NgAnnotatePlugin = require('ng-annotate-webpack-plugin');
const baseWebpackConfig = require('./webpack.config');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var conf = baseWebpackConfig;
conf.mode = 'production';

conf.plugins.push(new NgAnnotatePlugin());
conf.plugins.push(
  new UglifyJSPlugin({
    sourceMap: true,
  })
);
conf.plugins.push(new webpackBundleAnalyzer.BundleAnalyzerPlugin());

module.exports = conf;