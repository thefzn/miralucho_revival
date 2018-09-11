const path = require('path');
const ExtractTextPlugin = require("mini-css-extract-plugin");

const config = require('../config');

exports.assetsPath = (_path) => {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory;
    if (process.env.LIB_PACK) {
        return path.posix.join(config.lib.assetsSubDirectory, _path);
    }
    return path.posix.join(assetsSubDirectory, _path);
};

exports.assetsLibPath = _path => path.posix.join(config.lib.assetsSubDirectory, _path);

exports.cssLoaders = (o) => {
    const options = o || {};

    const cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap,
        },
    };

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = [cssLoader];
        if (loader) {
            loaders.push({
                loader: `${loader} -loader`,
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap,
                }),
            });
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            loaders.unshift(ExtractTextPlugin.loader);
        }
        return loaders;
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus'),
    };
};

// Generate loaders for standalone style files
exports.styleLoaders = (options) => {
    const output = [];
    const loaders = exports.cssLoaders(options);

    Object.keys(loaders).forEach((extension) => {
        const loader = loaders[extension];
        output.push({
            test: new RegExp(`\\.${extension}$`),
            loader,
        });
    });
    return output;
};
