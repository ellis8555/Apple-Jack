const path = require("path");
const { merge } = require("webpack-merge");
const webpackCommon = require("./webpack.config");

module.exports = merge(webpackCommon, {
    mode: "production",
    output: {
        filename: "[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "[path][name][ext]",
        clean: true
    },
    devtool: "source-map",
})