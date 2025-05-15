const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv");
const webpack = require("webpack");
const env = dotenv.config().parsed;

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new webpack.DefinePlugin({
      "process.env.CURRENCY_KEY": JSON.stringify(env.CURRENCY_KEY),
    }),
  ],
  devServer: {
    static: "./dist",
    historyApiFallback: true,
    open: true,
    port: 3000,
  },
  mode: "development",
};
