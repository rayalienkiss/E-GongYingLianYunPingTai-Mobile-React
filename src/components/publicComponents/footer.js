/*
// footer
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Link } from 'react-router'

import { Button, Popup } from 'antd-mobile'

import { SharePanel } from 'components'

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  // Note: the popup content will not scroll.
  wrapProps = {
    // onTouchStart: e => e.preventDefault(),
  };
}

export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sel: ''
        };
    }

    onClick() {
        Popup.show (
            <SharePanel/>, { animationType: 'slide-up', wrapProps, maskClosable: true }
        );
    }

    onClose(sel) {
        this.setState ({
            sel
        });
        Popup.hide();
    }

    render() {
        return (
            <footer className="footer">
                <ul>
                    <li>
                        <Link to="/about-frontpay" className="footer-link">关于钱途</Link>
                    </li>
                    <li>
                        <Link to="/about" className="footer-link">关于平台</Link>
                    </li>
                    <li>
                        <a href="http://www.paywe.cn/" className="footer-link">电脑版</a>
                    </li>
                    {/* 和产品沟通后，决定T了这个鸡肋分享 */}
                    {/* <li>
                        <span className="footer-link" onClick={ this.onClick }>分享</span>
                    </li> */}
                </ul>
                <p>
                    版权所有&copy;广东钱途互联商务服务有限公司&nbsp;粤ICP备&nbsp;14098252号-1
                </p>
                <p>
                    客服电话：400-9928-699
                </p>
            </footer>
        )
    }
}
