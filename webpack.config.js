const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: {
    "eventLogger": "./src/eventLogger.ts",
    "playEvent": "./src/playEvent.ts",
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./dist"),
    libraryTarget: "umd",
    library: "[name]",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(pug|jade)$/,
        loader: "pug-loader",
        query: {
          pretty: true,
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    new HtmlWebpackPlugin({ filename: "index.html", template: "src/index.pug" }),
  ],
};
