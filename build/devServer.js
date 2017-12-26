const webpack = require('webpack')
const path = require('path')
const openBrowser = require('react-dev-utils/openBrowser');
const choosePort = require('react-dev-utils/WebpackDevServerUtils').choosePort;
const WebpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevServer = require("webpack-dev-server");
const historyApiFallback = require('connect-history-api-fallback');

let config = require('./webpack.dev.config.js')
let devEnv = require('./dev');
let baseEnv = require('./base');
let compiler = webpack(config);

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || devEnv.browserPort;

const runServer = function(host, port){

    // serve webpack bundle output
    var app = new webpackDevServer(compiler, {
        publicPath: config.output.publicPath,
        publicPath: '/dist/',
        contentBase: path.resolve(__dirname, '../', 'views'),
        compress: true,
        hotOnly: true,
        noInfo: true,
        watchOptions: {
            ignored: /node_modules/,
        },
        host: host,
        stats: { colors: true },
        proxy: baseEnv.proxy
    });

    // enable hot-reload and state-preserving
    // compilation error display
    app.use(WebpackHotMiddleware(compiler));

    app.use(historyApiFallback());

    app.listen(port, host, function (err) {
        if (err) {
            console.log(err);
        }

        console.log("PID:", process.pid);

        openBrowser(`http://${host}:${port}/`);
        
    });
}


choosePort(HOST, PORT).then((port) => {
    if (port === null) {
      return;
    }
    try {
        runServer(HOST, port);
    } catch (e) {
      console.log(e);
    }
});
