const webpack = require('webpack');
const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

var env = process.env.NODE_ENV.trim(); // 当前环境
var analyze = process.env.analyze; // 当前是否启动分析
var version = require('../package.json')['version'];
let devEnv = require('./dev');

let config = {
    entry: {
        index: [
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client?reload=true',
            path.resolve(__dirname, '../', "src/index")
        ],
        vendors: [
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'redux',
            'redux-thunk',
            'immutable',
            'classnames',
            'keymirror',
            'react-router-dom'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../', 'dist/'),
        filename: "[name].js",
        //配置按需加载[chunkhash:5]
        chunkFilename: '[name].trunk.js',
        //给自动引用的生成文件加路径
        publicPath: '/dist/'
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        ["es2015",{
                            'modules': false  //  允许tree shaking
                        }],
                        "stage-0",
                        "react"
                    ],
                    plugins: ['transform-runtime', "transform-decorators-legacy"]
                }
            }],
            include: [path.resolve(__dirname, '../', 'src')],
            exclude: /(node_modules|bower_components)/
        },
        {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 50000,
                    name: '/imgs/[name].[ext]'
                }
            }]
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: [
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options:{
                            config: {
                                path: path.resolve(__dirname, "../", "build/postcss.config.js")
                            }
                        }
                    }
                ],
                fallback: "style-loader",
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: ["css-loader", "sass-loader"],
                fallback: "style-loader",
            })
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.tsx', 'ts'],
        alias: {
            $redux: path.resolve(__dirname, '../', 'public/src/redux'),
            $apis: path.resolve(__dirname, '../', 'public/src/apis'),
            $components: path.resolve(__dirname, '../', 'public/src/components'),
            $routes: path.resolve(__dirname, '../', 'public/src/routes'),
            $styles: path.resolve(__dirname, '../', 'public/src/styles'),
            $helper: path.resolve(__dirname, '../', 'public/src/helper'),
            $utils: path.resolve(__dirname, '../', 'public/src/utils'),
            $actions: path.resolve(__dirname, '../', 'public/src/actions'),
            $views: path.resolve(__dirname, '../', 'public/src/views'),
        }
    },
    plugins: [
        new NyanProgressPlugin(),
        new CleanWebpackPlugin(['dist'],　 //匹配删除的文件
        {
            root: path.resolve(__dirname, '../', 'dist'),//根目录
            verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
            dry:      false        　　　　　　　　　　//启用删除文件
        }),
        new LodashModuleReplacementPlugin,
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            filename: "vendors.js",
        }),
        new HtmlWebpackPlugin({
            hash: false,
            filename: path.resolve(__dirname, '../', 'views/index.html'), //最终生成的html文件
            template: path.resolve(__dirname, '../', 'templates/index.html'),
            chunks: ['vendors', 'index'], //入口文件所依赖的js文件
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        
        new OpenBrowserPlugin({ url: `http://localhost:${devEnv.browserPort}` }),

        //将模块暴露到全局去
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     Immutable:'immutable'
        // }),

        new ExtractTextPlugin("styles/[name].css"),

        //  scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),

        new webpack.DefinePlugin({
            __VERSION__: JSON.stringify(version),
            __DEV__: env === 'development',
            __PROD__: env === 'production',
            __WHY_DID_YOU_UPDATE__: true  //是否检测不必要的组件重渲染
          }),
    ],
    devtool: 'source-map'
}

if(analyze === "true"){
    config.plugins = config.plugins.concat([
        new BundleAnalyzerPlugin({
            analyzerPort: 4455
        }),
    ]);
}

module.exports = config;
