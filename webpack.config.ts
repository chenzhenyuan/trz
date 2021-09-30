import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import 'webpack-dev-server';

export default {
  mode: 'development',

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
    static: false,
    compress: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [ '@babel/env', {'useBuiltIns': 'usage', 'corejs': 3} ],
              [ '@babel/typescript' ]
            ],

            ignore: [
              'node_modules'
            ],

            plugins: [
              "@babel/plugin-transform-typescript",
              "@babel/plugin-transform-runtime",
              "@babel/plugin-syntax-dynamic-import",
              ["@babel/plugin-proposal-decorators",{ "legacy": true }],
              ["@babel/plugin-proposal-class-static-block"],
              ["@babel/plugin-proposal-class-properties",{ "loose": true }],
              ["@babel/plugin-proposal-private-methods",{ "loose": true }],
              /* [ "@babel/plugin-transform-react-display-name" ], */
              ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
            ]
          }
        }
      },
    ]
  },

  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx', 'scss' ],
    alias: {}
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      title: '开发模式',
      filename: 'index.html'
    }),
  ],
};
