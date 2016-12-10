/**
 * dev
 *
 * by limit
 */

var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var OpenBrowserPlugin = require('open-browser-webpack-plugin')

var baseConf = require('./webpack.base.config')
var host = require('./host')()
var port = '8080';

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
        })
    ],
    devServer: {
        host: host,
        port: port,
        historyApiFallback: true,
        proxy: {
            '/API/*': {
                // target: 'http://api.m.paywe.cn/', //开发服务器  需要配置host 10.1.21.9 api.m.paywe.cn
                target: 'http://m.paywe.dev/', //开发服务器  需要配置host 10.1.21.9 api.m.paywe.cn
                pathRewrite: {
                    '^/API': "/api"
                },
                secure: false,
                changeOrigin: true,
            }
        }
    }
})
