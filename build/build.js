const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');

const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');
require('./check-versions');

process.env.NODE_ENV = 'production';

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), (err) => {
    if (err) throw err;
    webpack(webpackConfig, (err2, stats) => {
        if (err2) throw err2;
        console.log(`${stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
        })}
        `);

        console.log(chalk.cyan('  Build complete.\n'));
    });
});
