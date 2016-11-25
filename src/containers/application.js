/*
// 申请表单
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Header,Footer } from 'components'

// ajax
import axios from 'axios'

export default class Application extends Component {

    render() {

        return (
            <div className="container-inner">
                {/* nav */}
                <Header title="申请资料填写" linkTo="" headCls="header"></Header>
                {/* 页脚 */}
                <Footer></Footer>
            </div>
        )
    }
}
