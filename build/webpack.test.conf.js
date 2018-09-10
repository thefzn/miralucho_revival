const merge = require('webpack-merge');
const webpack = require('webpack');
const conf = require('../config/test.env');

const utils = require('./utils');
const baseConfig = require('./webpack.base.conf');

const webpackConfig = merge(baseConfig, {
    mode: 'production',
    // use inline sourcemap for karma-sourcemap-loader
    module: {
        rules: utils.styleLoaders(),
    },
    devtool: '#inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': conf,
        }),
    ],
});

// no need for app entry during tests
delete webpackConfig.entry;

module.exports = webpackConfig;
