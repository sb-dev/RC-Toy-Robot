/*
    ./webpack.config.js
*/
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body'
})

const FaviconsWebpackPluginConfig = new FaviconsWebpackPlugin({
    logo: './client/assets/images/rc-logo.png',
    prefix: 'assets/icons/'
})

const CleanWebpackPluginConfig = new CleanWebpackPlugin(['dist'])

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './assets/[name]-[hash:8].[ext]'
                        },
                    },
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            mimetype: 'application/font-woff'
                        }
                    }

                ]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(css)$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },
    devtool: 'inline-source-map',
    plugins: [CleanWebpackPluginConfig, HtmlWebpackPluginConfig, FaviconsWebpackPluginConfig]
}