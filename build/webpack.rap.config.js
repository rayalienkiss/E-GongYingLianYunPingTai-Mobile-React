/**
 * rap
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
const projectId = 15; //RAP上的projectId

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
            '/api/*': {
                target: 'http://rap.monster/', // RAP mock服务器  需要配置host 192.168.8.164 rap.monster.dev
                pathRewrite: {
                    '^/api': `/mockjsdata/${projectId}/api`
                },
                secure: false,
                changeOrigin: true,
            }
        }
    }
})