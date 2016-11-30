/*
// index
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Header,Footer,Article } from 'components'

//import classNames from 'classnames'

export default class AboutWebSite extends Component {

    render() {

        const articleTitle = 'E+供应链云平台';

        return (
            <div className="container-inner">
                {/* nav */}
                <Header title="关于平台" linkTo="" headCls="header"/>
                <Article articleCls="gylpt-article" articleTitle={ articleTitle }>
                    <p>
                        E+供应链云平台是钱途互联携手招商银行，发挥双方在供应链融资解决方案、IT专业技术、金融资源等领域的优势，创新推出在供应链的基础上，为核心企业和上下游企业提供便捷、快速、安全的供应链服务的金融服务平台，致力于协助核心企业与上下游建立可持续发展的贸易关系，盘活整条供应链。
                    </p>
                    <p>
                        <span className="fontcolor-warning ">特点：</span>利率低至5%、最快T+0放款、全线上化操作
                    </p>
                    <p>
                        <span className="fontcolor-warning ">服务对象：</span>核心企业、供应链上下游企业
                    </p>
                    <p>
                        <span className="fontcolor-warning ">融资业务：</span>应收账款融资、订单融资
                    </p>
                    <img className="article-img" src="../src/public/images/article-img-2.jpg"/>
                    <h3>
                        上下游企业轻松融资流程
                    </h3>
                </Article>
                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
}
