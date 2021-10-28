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

  entry: './development.ts',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
  },

  devServer: {
    historyApiFallback: true,
    port: 8905,
    hot: true,
    static: {
      serveIndex: true,
      publicPath: "/static",
      directory: path.join(__dirname, 'static'),
    },
    compress: true,
    headers: () => {
      return {
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods': "GET, POST, OPTIONS",
        'Access-Control-Allow-Headers': "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization",
      };
    },
  },

  module: {
    // noParse: /jquery|bootstrap/,
    rules: [
      {
        test: /\.(ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: JSON.parse(fs.readFileSync(path.resolve(__dirname, '.babelrc')).toString()),
        }
      },
    ]
  },

  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx', '.scss' ],
    alias: {}
  },

  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      title: '开发模式',
      filename: 'index.html'
    }),
  ],
};
