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
                    <img src=""/>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
