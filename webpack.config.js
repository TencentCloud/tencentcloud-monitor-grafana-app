const fs = require('fs');
const path = require('path');
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const packageinfo = require('./package.json');

module.exports.getWebpackConfig = (config, options) => {
  const hasEngREADME = fs.existsSync(path.resolve(process.cwd(), 'src', 'README.en-US.md'));

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
      new CopyWebpackPlugin(
        [
          // If src/README.en-US.md exists use it; otherwise the root README
          { from: hasEngREADME ? 'README.en-US.md' : '../README.en-US.md', to: './README.md', force: true },
        ],
        {
          logLevel: options.watch ? 'silent' : 'warn',
        }
      ),
    ],
  };

  return customWebpackConfig;
};
