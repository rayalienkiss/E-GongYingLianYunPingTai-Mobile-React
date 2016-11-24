/*
// footer
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Link } from 'react-router'

export default class Footer extends Component {

    render() {
        return (
            <footer className="footer">
                <ul>
                    <li>
                        <Link to="AboutUs" className="footer-link">关于钱途</Link>
                    </li>
                    <li>
                        <Link to="AboutWebsite" className="footer-link">关于平台</Link>
                    </li>
                    <li>
                        <a href="http://www.paywe.cn/" className="footer-link">电脑版</a>
                    </li>
                    <li>
                        <Link to="" className="footer-link">分享</Link>
                    </li>
                </ul>
                <p>
                    版权所有&copy;广东钱途互联商务服务有限公司&nbsp;粤ICP备&nbsp;14098252号-1
                </p>
                <p>
                    客服电话：400-106-6698
                </p>
            </footer>
        )
    }
}
