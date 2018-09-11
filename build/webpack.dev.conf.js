const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config');
const utils = require('./utils');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap,
            extract: true,
        }),
    },
    // cheap-module-eval-source-map is faster for development
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env,
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
        }),
        new FriendlyErrorsPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ],
});
