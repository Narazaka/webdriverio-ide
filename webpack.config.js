const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const tsconfig = require("./tsconfig.json");
tsconfig.compilerOptions.outDir = "";

module.exports = {
  devtool: "source-map",
  entry: {
    "eventLogger": "./src/lib/eventLogger.ts",
    "playEvent": "./src/lib/playEvent.ts",
  },
  output: {
    filename: "lib/[name].js",
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
        options: {
          compilerOptions: tsconfig.compilerOptions,
        },
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
