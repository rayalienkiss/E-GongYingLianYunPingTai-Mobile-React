/**
 * 路由配置
 *
 * by tommyshao
 */

import React from 'react'
import { Router, hashHistory } from 'react-router'

const routes = {
    component: require('../containers/common/layout').default,
    childRoutes: [
        {
            //默认返回首页
            path: '/',
            indexRoute: {
                onEnter: (nextState, replace) => replace('Home')
            }
        },
        {
            //跳转首页
            path: 'Home',
            getComponent(nextState, cb) {
                require.ensure([], require => {
                    cb(null, require('../containers/index').default)
                })
            }
        },
        {
            //跳转关于钱途
            path: 'AboutUs',
            getComponent(nextState, cb) {
                require.ensure([], require => {
                    cb(null, require('../containers/aboutUs.js').default)
                })
            }
        },
        {
            //跳转关于平台
            path: 'AboutWebsite',
            getComponent(nextState, cb) {
                require.ensure([], require => {
                    cb(null, require('../containers/aboutWebsite.js').default)
                })
            }
        },
        {
            //跳转申请已提交
            path: 'ApplicationCommitted',
            getComponent(nextState, cb) {
                require.ensure([], require => {
                    cb(null, require('../containers/applicationCommitted.js').default)
                })
            }
        }
    ]
}

export default <Router history={ hashHistory } routes={ routes } />
