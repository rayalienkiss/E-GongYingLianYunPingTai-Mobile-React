/**
 * dev
 *
 * by limit
 */

var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var OpenBrowserPlugin = require('open-browser-webpack-plugin')

var baseConf = require('./webpack.base.config')
var host = require('./host')()
var port = '8080';

var pkg = require('../package.json')
var webConf = pkg.webConfig
var source_path = path.resolve('./src')

module.exports = merge(baseConf, {
    cache: true,
    devtool: 'eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            '__DEV__': true
        }),
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        }),
        new OpenBrowserPlugin({
            url: ['http://', host, ':', port, '/'].join('')
        }),
        new HtmlWebpackPlugin({
            title: webConf.title,
            keywords: webConf.keywords,
            description: webConf.description,
            tongji: webConf.tongji,
            template: source_path + '/index.html',
            filename: 'index.html',
            inject: 'body',
            js: [
                '/src/public/js/polyfill.min.js',
                '/src/public/js/jquery.min.js',
                'http://res.wx.qq.com/open/js/jweixin-1.0.0.js',
            ],
        }),
    ],
    devServer: {
        host: host,
        port: port,
        historyApiFallback: true,
        proxy: {
            '/api/*': {
                target: 'http://m.paywe.dev/', //开发服务器  需要配置host 10.1.21.9 api.m.paywe.cn
                // target: 'http://m.paywe.test/', //开发服务器  需要配置host 10.1.21.9 api.m.paywe.cn
                // target: 'http://dm.paywe.cn/', //开发服务器  需要配置host 10.1.21.9 dm.paywe.cn
                secure: false,
                changeOrigin: true,
            }
        }
    }
})
