const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, '../src/client-entry.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'assets/js/[name].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /(\.js$)|(\.vue$)/,
        loader: 'eslint-loader',
        exclude: /node-modules/
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          css: [MiniCssExtractPlugin.loader, 'css-loader'],
          scss: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node-modules/
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename: 'assets/styles.css'})
  ]
};

module.exports = config;