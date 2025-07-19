const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',  // cache busting
    path: path.resolve(__dirname, 'dist'),
    clean: true, // clean old files
  },
  mode: 'development', // change to 'production' for build
  devtool: 'inline-source-map', // for easier debugging
  devServer: {
    static: './dist',
    port: 3000,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Transpile JS and JSX files
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, // Allow importing CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Support images (bonus)
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // base HTML file
    }),
    new Dotenv(), // loads environment variables from .env file
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // resolve these extensions
  },
};
