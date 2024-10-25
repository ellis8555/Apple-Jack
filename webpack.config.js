const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

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
                championsTeamName: "Degeneration Hax"
            },
            filename: "index.html",
            favicon: path.resolve(__dirname, "./img/favicon/haxFav.png")
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",

        })
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    }
}