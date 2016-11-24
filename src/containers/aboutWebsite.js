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
                <Header title="关于平台" linkTo="" headCls="header"></Header>
                <Article articleCls="gylpt-article" articleTitle={ articleTitle }>
                    <p>
                        E+供应链云平台，是由广东钱途互联商务服务有限公司（以下简称“钱途互联”）创新推出，在供应链基础上为核心企业和上下游企业提供便捷、快速、安全的金融信息服务平台。依托于钱途互联现有的E+互联网供应链、E+互联网供应链定制版及合作产品，将为上下游企业提供更符合其需求的融资解决方案，让企业以更便捷的操作流程，更短的时间，获得更低成本的融资，助企业赢得每一份商机。                     </p>
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
                <Footer></Footer>
            </div>
        )
    }
}
