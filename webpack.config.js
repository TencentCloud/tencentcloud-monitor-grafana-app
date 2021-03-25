const path = require('path');
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const packageinfo = require('./package.json');

module.exports.getWebpackConfig = (config, options) => {
  const customWebpackConfig = {
    ...config,
    context: path.join(__dirname, 'src'),
    entry: {
      './module': './module.ts',
      'components/config': './components/config.ts',
      'datasource/module': './datasource/module.ts',
    },
    output: {
      ...config.output,
      chunkFilename: '[name].bundle.js',
      library: 'TencentCloudMonitorGrafanaApp',
    },
    plugins: [
      ...config.plugins,
      ...(options.production ? [new CleanWebpackPlugin()] : []),
      new DefinePlugin({
        'process.env.TENCENT_CLOUD_MONITOR_GRAFANA_PLUGIN_VERSION': JSON.stringify(packageinfo.version),
      }),
    ],
  };

  return customWebpackConfig;
};
