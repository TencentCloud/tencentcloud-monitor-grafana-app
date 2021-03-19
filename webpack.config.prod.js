const NgAnnotatePlugin = require('ng-annotate-webpack-plugin');
const baseWebpackConfig = require('./webpack.config');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var conf = baseWebpackConfig;
conf.mode = 'production';

conf.plugins.push(new NgAnnotatePlugin());
conf.plugins.push(
  new UglifyJSPlugin({
    sourceMap: true,
  }),
);

module.exports = conf;
