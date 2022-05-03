/*
 * @since        : 2021/10/24 16:32:47 +0800
 * @filePath     : /webpack.config.ts
 * @updated      : 2022/05/04 06:53:32 +0800
 * @lastEditors  : Please set LastEditors
 * @creator      : JAYNE·CHEN
 * @description  : Webpack 配置文件
 */


import * as path from 'path';
import * as fs from 'fs';
import * as webpack from 'webpack';
import * as JSON from 'json5';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import 'webpack-dev-server';


export default {
  mode: 'development',

  devtool: 'source-map',

  target: 'web',

  entry: './development/index',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
  },

  devServer: {
    allowedHosts: 'all',
    compress: true,
    historyApiFallback: true,
    hot: true,
    port: 8905,
    static: {
      serveIndex: true,
      publicPath: '/static',
      directory: path.join(__dirname, 'static'),
    },
    headers: () => {
      return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization',
      };
    },
  },

  module: {
    // noParse: /jquery|bootstrap/,
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: JSON.parse(fs.readFileSync(path.resolve(__dirname, '.babelrc')).toString()),
        }
      },
    ]
  },

  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx', '.scss' ],
    alias: {}
  },

  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.ProgressPlugin(),

    new webpack.ProvidePlugin({
      React: 'react',
      useState: [ 'react', 'useState' ],
      useEffect: [ 'react', 'useEffect' ],
      Component: [ 'react', 'Component' ]
    }),

    new HtmlWebpackPlugin({
      title: '开发模式',
      publicPath: '/',
      template: path.resolve(__dirname, 'template.html'),
      filename: 'index.html'
    }),
  ],
};
