/*
// index
// --------------------------------------------------
*/

import React, {
    Component
} from 'react'

import { Link } from 'react-router'

import {
    Header,
    Footer,
    FlowResult
} from 'components'

import { Popup } from 'antd-mobile'

import { SharePanel } from 'components'

// ajax
import axios from 'axios'

import store from 'store';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  // Note: the popup content will not scroll.
  wrapProps = {
    // onTouchStart: e => e.preventDefault(),
  };
}

export default class ApplicationCommitted extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sel: ''
        };
    }

    // onClick() {
    //     Popup.show (
    //         <SharePanel/>, { animationType: 'slide-up', wrapProps, maskClosable: true }
    //     );
    // }

    // onClose(sel) {
    //     this.setState ({
    //         sel
    //     });
    //     Popup.hide();
    // }

    componentDidMount() {
        this.setLogin();
    }

    setLogin() {
        let payWeLoginData = store.get("payWeLoginData");
        if (payWeLoginData) {
            return false;
        }
        axios.get('/api/user/info').then(res => {
            store.set("payWeLoginData", {
                user: res.data.data
            });
        });
    }

    render() {

        const title = '申请结果'; // 导航文案

        return (
            <div className="container-inner">
                {/* nav */}
                <Header title={ title } linkTo="/"/>
                {/* 流程结果 */}
                <FlowResult mainNotice="申请成功" florResultCls="flow-result success"/>
                <Link to="/Application" className="gylypt-button secondary flow-result-btn2">继续登记</Link>
                {/* <a className="gylypt-button primary flow-result-btn" href="javascript:void(0)" onClick={ this.onClick }>立即分享</a> */}
                <Link to="/ShareLink" className="gylypt-button primary flow-result-btn">邀请朋友加入</Link>
                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
}
