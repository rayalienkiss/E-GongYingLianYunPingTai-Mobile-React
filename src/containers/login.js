/*
// 推荐人登录页面
// --------------------------------------------------
*/

// 依赖框架
import React, { Component } from 'react'

// 公用组件
import { Header, Footer, LoginForm } from 'components'

// ajax
import axios from 'axios'

//创建并输出页面组件
export default class Login extends Component {

    render() {

        const title = '推荐人登录'; // 导航文案

        return (
            <div className="container-inner">
                {/* nav */}
                <Header title={ title } inUser={ true }/>
                {/* 表单 */}
                <LoginForm location={ this.props.location }/>
                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
}
