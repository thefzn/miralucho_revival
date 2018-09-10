const path = require('path');
const fs = require('fs');
const lint = require('eslint-friendly-formatter');

const config = require('../config');
const utils = require('./utils');


function resolve(dir) {
    return fs.realpathSync(`${__dirname}/${path.join('..', dir)}`);
}

module.exports = {
    entry: {
        main: [
            'babel-polyfill',
            './src/js/main.js',
        ],
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath,
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': resolve('src'),
        },
        symlinks: true,
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')],
                options: {
                    formatter: lint,
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[ext]'),
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name]-[ext].[ext]'),
                },
            },
        ],
    },
};
