const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const clientConfig = require('./webpack.client.config');

module.exports = function setupDevServer(app) {
  clientConfig.entry.app = [
    'webpack-hot-middleware/client',
    clientConfig.entry.app
  ];
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  );
  const clientCompiler = webpack(clientConfig);
  app.use(devMiddleware(clientCompiler, {
    stats: {
      hot: true,
      colors: true
    }
  }));
  app.use(hotMiddleware(clientCompiler));
};
