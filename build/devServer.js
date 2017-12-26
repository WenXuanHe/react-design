var express = require('express')
var webpack = require('webpack')
var path = require('path')
var WebpackHotMiddleware = require('webpack-hot-middleware')
var webpackDevServer = require("webpack-dev-server");
var config = require('./webpack.dev.config.js')
let devEnv = require('./dev');
var compiler = webpack(config);

// serve webpack bundle output
var app = new webpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  publicPath: '/dist/',
  contentBase: path.resolve(__dirname, '../', 'views'),
  compress: true,
  hotOnly: true,
  noInfo: true,
  stats: { colors: true }
});

// enable hot-reload and state-preserving
// compilation error display
app.use(WebpackHotMiddleware(compiler));

app.listen(devEnv.browserPort, "localhost", function (err) {
    if (err) {
        console.log(err);
    }
});
console.log("PID:", process.pid);