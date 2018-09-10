const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const devMiddlewareFn = require('webpack-dev-middleware');
const webpackConfig = process.env.NODE_ENV === 'testing'
    ? require('./webpack.prod.conf')
    : require('./webpack.dev.conf');
const config = require('../config');
require('./check-versions');

process.env.NODE_ENV = process.env.NODE_ENV || JSON.parse(config.dev.env.NODE_ENV);


// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port;
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser;
const app = express();
const compiler = webpack(webpackConfig);
const devMiddleware = devMiddlewareFn(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
});

// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

const uri = `http://localhost:${port}`;

let resolveFn;
const readyPromise = new Promise((resolve) => {
    console.log("> Server Ready");
    resolveFn = resolve;
});

console.log('> Starting dev server...');

devMiddleware.waitUntilValid(() => {
    console.log(`> Listening at ${uri}\n`);
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri);
    }
    resolveFn();
});

const server = app.listen(port);

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close();
    },
};
