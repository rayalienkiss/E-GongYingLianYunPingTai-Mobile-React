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
    onChange: (prevState, nextState) => {
        // console.log(prevState)
        // console.log(nextState)
        if (window._hmt) {
          _hmt.push(['_trackPageview', nextState.location.pathname]);
        }
    },
    component: require('../containers/common/layout').default,
    childRoutes: [{
        path: '/',
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('../containers/index').default)
            }, 'home')
        }
    },{
        //跳转关于钱途
        path: 'about-frontpay',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('../containers/aboutUs.js').default)
            }, 'AboutUs')
        }
    },{
        //跳转关于平台
        path: 'about',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('../containers/aboutWebsite.js').default)
            }, 'AboutWebsite')
        }
    },{
        //跳转申请已提交
        path: 'ApplicationCommitted',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('../containers/applicationCommitted.js').default)
            }, 'ApplicationCommitted')
        }
    },{
        //申请资料填写
        path: 'Application',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('../containers/application.js').default)
            }, 'Application')
        }
    },{
        // 专题页
        path: 'a',
        onEnter: (nextState, replace) => replace('', 'activity-1')
    },{
        // 专题页
        path: 'activity-1',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('../containers/activity_1.js').default)
            }, 'activity1')
        }
    },{
        //用户须知
        path: 'UserRight',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('../containers/userRight.js').default)
            }, 'UserRight')
        }
    },{
        //登录
        path: 'Login',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('../containers/login.js').default)
            }, 'Login')
        }
    },{
        //个人中心
        path: 'UserCenter',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('../containers/userCenter.js').default)
            }, 'UserCenter')
        }
    },{
        //基础信息
        path: 'ProFile',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('../containers/profile.js').default)
            }, 'ProFile')
        }
    },{
        //分享链接
        path: 'ShareLink',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('../containers/shareLink.js').default)
            }, 'ShareLink')
        }
    },{
        //我的分享
        path: 'ShareLog',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('../containers/shareLog.js').default)
            }, 'ShareLog')
        }
    },{
        //我的登记
        path: 'Registries',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('../containers/registries.js').default)
            }, 'Registries')
        }
    },{
        //我的登记详细页
        path: 'RegistriesDetail/:financeEnterpriseId',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('../containers/registriesDetail.js').default)
            }, 'Registries')
        }
    },{
      // 404
      path: '*',
      onEnter: (nextState, replace) => replace('', '/')
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
