const path = require("path");
const { merge } = require("webpack-merge");
const webpackCommon = require("./webpack.config");
const copyWebpack = require('copy-webpack-plugin')

module.exports = merge(webpackCommon, {
    mode: "production",
    output: {
        filename: "[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "[path][name][ext]",
        clean: true
    },
    devtool: "source-map",
    plugins: [
        new copyWebpack({
            patterns: [
                { from: "src/img/gifs", to: "img/gifs/" },
            ]
        })
    ]
})