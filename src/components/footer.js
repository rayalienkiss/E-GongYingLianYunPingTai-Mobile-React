/*
// footer
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Link } from 'react-router'

import { Modal, Button } from 'antd-mobile'

export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        var script = document.createElement('script');
        script.src = "http://v3.jiathis.com/code/jia.js";
        document.body.appendChild(script);
    }

    showModal() {
        this.setState ({
            visible: true
        });
    }

    onClose() {
        this.setState ({
            visible: false
        });
    }

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
                        <Link to="#" className="footer-link" onClick={ this.showModal.bind(this) }>分享</Link>
                        <Modal title="这是 title" closable maskClosable onClose={ this.onClose.bind(this) } visible={ this.state.visible }>
                            <div className="jiathis_style_32x32">
                              <a className="jiathis_button_tsina"></a>
                              <a className="jiathis_button_tqq"></a>
                              <a className="jiathis_button_weixin"></a>
                              <a className="jiathis_button_linkedin"></a>
                            </div>
                        </Modal>
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
