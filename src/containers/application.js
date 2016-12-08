/*
// 融资申请
// --------------------------------------------------
*/

// 依赖框架
import React, { Component } from 'react'

// 公用组件
import { Header, Footer, InsidePageBanner, AppliForm } from 'components'

// ajax
import axios from 'axios'

//创建并输出页面组件
export default class Application extends Component {

    render() {

        const imgUrl = "../src/public/images/inside-page-banner-1.jpg" //页面 banner 图片地址

        return (
            <div className="container-inner">
                {/* nav */}
                <Header title="融资需求登记" linkTo="" headCls="header"/>
                {/* 内页banner */}
                <InsidePageBanner imgUrl={ imgUrl } alt=""/>
                {/* 表单 */}
                <AppliForm/>
                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
}
