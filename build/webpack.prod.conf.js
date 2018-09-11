const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require("mini-css-extract-plugin");
const BundleAnalyzer = require('webpack-bundle-analyzer');

const utils = require('./utils');
const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');

const env = process.env.NODE_ENV === 'testing'
    ? require('../config/test.env')
    : config.build.env;

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].js'),
        chunkFilename: utils.assetsPath('js/[name].js'),
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
        }),
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env,
        }),

        // extract css into its own file
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].css'),
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            sourceMap: true,
        }),

        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true,
            },
        }),

        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: process.env.NODE_ENV === 'testing'
                ? 'index.html'
                : config.build.index,
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency',
        }),

        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),

        // copy custom static assets
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: config.build.assetsSubDirectory,
            ignore: ['.*'],
        }]),
    ],
});

if (config.build.productionGzip) {
    webpackConfig.plugins.push(new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${config.build.productionGzipExtensions.join('|')})$'`),
        threshold: 10240,
        minRatio: 0.8,
    }));
}


if (config.build.bundleAnalyzerReport) {
    const { BundleAnalyzerPlugin } = BundleAnalyzer;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
