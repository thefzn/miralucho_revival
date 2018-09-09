require('./check-versions');
const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');

const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');

process.env.NODE_ENV = 'production';
process.env.LIB_PACK = true;

const spinner = ora('building for library...');
spinner.start();

rm(path.join(config.lib.assetsRoot, config.lib.assetsSubDirectory), (err) => {
    if (err) throw err;
    webpack(webpackConfig, (err2, stats) => {
        spinner.stop();
        if (err2) throw err2;
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
        }));
        console.log('');
        console.log(chalk.cyan('  Build complete.\n'));
    });
});
process.env.LIB_PACK = false;
