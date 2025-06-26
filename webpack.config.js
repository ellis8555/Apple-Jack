const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const copyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
    entry: {
        main: path.resolve(__dirname, "./src/index.js")
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(jpg|png|svg)$/i,
                type: "asset/resource",
              },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Hax94",
            template: path.resolve(__dirname, "./src/template.html"),
            templateParameters: {
                headerImage: "./img/haxball-big-min.png",
                championsLogo: "./img/teamLogos/S04/degenerationHaxHomeS04.svg",
                championsTeamName: "Scribethonenest"
            },
            filename: "index.html",
            favicon: path.resolve(__dirname, "./img/favicon/haxFav.png")
        }),
        new MiniCssExtractPlugin({
            filename: "[contenthash].css",

        }),
        new copyWebpackPlugin({
            patterns: [
                {
                    from : path.resolve(__dirname, "src/sw.js"),
                    to: "sw.js"
                }
            ]
        })
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    }
}