const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',  
    path: path.resolve(__dirname, 'dist'),
    clean: true, 
  },
  mode: 'development', 
  devtool: 'inline-source-map', 
  devServer: {
    static: './dist',
    port: 3001,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, 
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, 
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
