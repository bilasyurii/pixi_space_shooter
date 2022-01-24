const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devServer: {
    static: 'dist',
    port: 3000,
  },
  entry: './src/main.js',
  devtool: 'inline-source-map',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "assets", to: "assets" },
      ],
    }),
    new HTMLWebpackPlugin({
      template: 'html/index.html',
      filename: 'index.html',
    }),
  ],
};
