const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',
  module: {
    rules: [{
      test: /\.(js)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    }],
  },
  entry: './src/main.js',
  optimization: {
    minimizer: [new UglifyJSPlugin({
      uglifyOptions: {
        output: {
          comments: false,
        },
      },
    })],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "assets", to: "assets" },
      ],
    }),
    new HTMLWebpackPlugin({
      template: 'html/index.html',
      filename: 'index.html',
      hash: true,
      minify: false,
    }),
  ],
};
