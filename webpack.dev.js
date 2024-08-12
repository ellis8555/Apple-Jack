const path = require("path");
const { merge } = require("webpack-merge");
const webpackCommon = require("./webpack.config");

module.exports = merge(webpackCommon, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "[path][name][ext]",
  },
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
    },
    open: true,
    hot: true,
    compress: true,
    port: 9000,
  },
});