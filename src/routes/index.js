/**
 * 路由配置
 *
 * by tommyshao
 */

import React from 'react'
import {
    Router,
    browserHistory,
    useRouterHistory
} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useScroll from 'scroll-behavior/lib/useStandardScroll';


const routes = {
    component: require('../containers/common/layout').default,
    childRoutes: [{
        path: '/',
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('../containers/index').default)
            }, 'home')
        }
    }, {
        //跳转关于钱途
        path: 'AboutUs',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('../containers/aboutUs.js').default)
            }, 'AboutUs')
        }
    }, {
        //跳转关于平台
        path: 'AboutWebsite',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('../containers/aboutWebsite.js').default)
            }, 'AboutWebsite')
        }
    }, {
        //跳转申请已提交
        path: 'ApplicationCommitted',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('../containers/applicationCommitted.js').default)
            }, 'ApplicationCommitted')
        }
    }, {
        //申请资料填写
        path: 'Application',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('../containers/application.js').default)
            }, 'Application')
        }
    }, {
        // 专题页
        path: 'a',
        onEnter: (nextState, replace) => replace('', 'activity-1')
    }, {
        // 专题页
        path: 'activity-1',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('../containers/activity_1.js').default)
            }, 'activity1')
        }
    }, {
        //用户须知
        path: 'UserRight',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('../containers/userRight.js').default)
            }, 'UserRight')
        }
    }]
}

const appHistory = useScroll(useRouterHistory(createBrowserHistory))();

export default < Router history = {
    appHistory
}
routes = {
    routes
}
/>
