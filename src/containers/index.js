/*
// index
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Header,Footer } from 'components'

//import classNames from 'classnames'

// ajax
import axios from 'axios'

export default class Home extends Component {

    render() {
        return (
            <div className="container-inner">
                <Header title="供应链云平台" linkTo="" headCls="header index-header"></Header>
                <div className="index-banner">
                    <img src="../src/public/images/bitmap/bitmap_1x1.jpg" alt="index banner" data-src="https://www.qianduan.com/Content/images/index/tu3.jpg"/>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
