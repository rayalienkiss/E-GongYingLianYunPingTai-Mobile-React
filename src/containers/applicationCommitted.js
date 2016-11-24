/*
// index
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Header,Footer,FlowResult } from 'components'

// ajax
import axios from 'axios'

export default class ApplicationCommitted extends Component {

    render() {

        return (
            <div className="container-inner">
                {/* nav */}
                <Header title="申请结果" linkTo="" headCls="header"></Header>
                {/* 流程结果 */}
                <FlowResult mainNotice="申请成功" florResultCls="flow-result success"></FlowResult>
                <a className="gylypt-button primary" href="#">立即分享</a>
                {/* 页脚 */}
                <Footer></Footer>
            </div>
        )
    }
}
