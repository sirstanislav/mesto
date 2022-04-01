const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  entry: {
    main: './src/scripts/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8080,
    open: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin(),
    new MinifyPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, 
          {
            loader: "css-loader",
            options: { importLoaders: 1}
          },
          "postcss-loader"
        ],
      },
      // {
      //   test: /\.(svg|jpg)$/,
      //   type: 'asset/resource'
      // }
    ],
  },
}