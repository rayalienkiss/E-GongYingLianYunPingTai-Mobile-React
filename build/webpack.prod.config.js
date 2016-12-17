/**
 * 生产环境
 *
 * by tommyshao
 */

var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var baseConf = require('./webpack.base.config')
baseConf.output.publicPath = '/'
var banner = require('./banner')
var assertPath = path.resolve(__dirname, '../assets')
var source_path = path.resolve('./src')
var pkg = require('../package.json')
var webConf = pkg.webConfig

module.exports = merge(baseConf, {
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin({
            '__DEV__': false
        }),
        new CleanWebpackPlugin([assertPath], {
            root: '',
            verbose: true,
            dry: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: { // 排除不想要压缩的对象名称
                except: ['$super', '$', 'exports', 'require', 'module', '_']
            },
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        }),
        new webpack.NoErrorsPlugin(),
        new FaviconsWebpackPlugin({
            logo: source_path + '/public/images/logo.png',
            icons: {
                android: false,
                appleIcon: false,
                appleStartup: false,
                favicons: true
            }
        }),
        new webpack.BannerPlugin(banner, {
            raw: true
        }),
        new webpack.optimize.CommonsChunkPlugin('common', 'common-[hash].js'),
        new HtmlWebpackPlugin({
            title: webConf.title,
            keywords: webConf.keywords,
            description: webConf.description,
            tongji: webConf.tongji,
            template: source_path + '/index.html',
            filename: 'index.html',
            inject: 'body',
            js: [
                '/js/polyfill.min.js',
                '/js/jquery.min.js',
                'http://res.wx.qq.com/open/js/jweixin-1.0.0.js',
            ],
        }),
        // 复制文件到dist目录
        new CopyWebpackPlugin([{
            from: path.join(source_path, 'public/js'),
            to: path.join(assertPath, 'js')
        }, ])
    ]
})
