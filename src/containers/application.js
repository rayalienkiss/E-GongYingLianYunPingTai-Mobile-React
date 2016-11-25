/*
// 申请表单
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Header,Footer,InsidePageBanner } from 'components'

// ajax
import axios from 'axios'

export default class Application extends Component {

    render() {

        const imgUrl = "../src/public/images/inside-page-banner-1.jpg"

        return (
            <div className="container-inner">
                {/* nav */}
                <Header title="申请资料填写" linkTo="" headCls="header"/>
                {/* 内页banner */}
                <InsidePageBanner imgUrl={ imgUrl } alt=""/>
                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
}
