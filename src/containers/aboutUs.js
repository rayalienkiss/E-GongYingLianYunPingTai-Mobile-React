/*
// index
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Header,Footer,Article } from 'components'

export default class AboutUs extends Component {

    render() {

        const articleTitle = <img src="../src/public/images/frontpay.jpg"/>;

        return (
            <div className="container-inner">
                {/* nav */}
                <Header title="关于钱途" linkTo="" headCls="header"></Header>
                <Article articleCls="gylpt-article img-title" articleTitle={ articleTitle }>
                    <p>
                        成立于2014年01月，公司全称“广东钱途互联商务服务有限公司”，总部位于广州天河CBD核心地段，在深圳设立办事处，目前公司拥有金融及互联网精英逾百人。钱途互联是国内首家专注于通过互联模式，基于企业交易过程电子登记系统，为中小企业提供增值、新型供应链融资及创新支付结算服务，为招商银行定制“E+账户”并提供运营服务的产业互联网金融服务商。
                    </p>
                    <p>
                        目前，钱途互联业务已辐射金融、地产、餐饮、医药等多个行业，并与允升工业、山东高速、万科地产、九州通等数百家知名企业建立紧密的合作关系，根据合作伙伴的实际需求定制产品，在实现E+账户功能的基础上，帮助合作伙伴对接优质金融资源，安全高效地解决了增值、融资和结算需求，以及产业金融领域的业务拓展和场景搭建。钱途互联的创新能力和专业服务获得众多合作伙伴和行业机构的高度认可，并于2015年获得国际顶级风投机构IDG资本的投资。
                    </p>
                    <img className="article-img" src="../src/public/images/article-img-1.jpg"/>
                    <h3>
                        <b>E+互联网供应链</b>
                    </h3>
                    <p>
                        “E+互联网供应链”是钱途互联联合招商银行为中小企业创新推出的、为解决核心企业上下游中小企业融资需求的平台。自2016年6月20正式上线发布以来，E+互联网供应链平台服务核心企业客户逾200家，中小企业客户逾20000家；短短4个月内，累计放款金额逾30亿。
                    </p>
                    <h4>
                        <b>案例</b>
                    </h4>
                    <ul className="case-co">
                        <li>
                            <img src="../src/public/images/article-logo/j_72.jpg"/>
                        </li>
                        <li>
                            <img src="../src/public/images/article-logo/ZhongGuoRenBao.jpg"/>
                        </li>
                        <li>
                            <img src="../src/public/images/article-logo/j_23.jpg"/>
                        </li>
                        <li>
                            <img src="../src/public/images/article-logo/j_12.jpg"/>
                        </li>
                        <li>
                            <img src="../src/public/images/article-logo/XXX.jpg"/>
                        </li>
                        <li>
                            <img src="../src/public/images/article-logo/JinHaiMaJiTuan.jpg"/>
                        </li>
                        <li>
                            <img src="../src/public/images/article-logo/HaiTianJiTuan.jpg"/>
                        </li>
                        <li>
                            <img src="../src/public/images/article-logo/j_45.jpg"/>
                        </li>
                        <li>
                            <img src="../src/public/images/article-logo/j_58.jpg"/>
                        </li>
                        <li>
                            <img src="../src/public/images/article-logo/LaoBaiXing.jpg"/>
                        </li>
                        <li>
                            <img src="../src/public/images/article-logo/DaJi.jpg"/>
                        </li>
                        <li>
                            <img src="../src/public/images/article-logo/j_16.jpg"/>
                        </li>
                    </ul>
                    <h3>
                        <b>E+互联网供应链-定制版</b>
                    </h3>
                    <p>
                        “E+互联网供应链-定制版”是根据核心企业及其上下游中小企业之间特定交易模式而提供的符合该链条实际需求的定制化的融资平台。
                    </p>
                    <h4>
                        <b>案例</b>
                    </h4>
                    <ul className="case-co">
                        <li>
                            <img src="../src/public/images/article-logo/j_19.jpg"/>
                        </li>
                        <li>
                            <img src="../src/public/images/article-logo/j_06.jpg"/>
                        </li>
                    </ul>
                </Article>
                {/* 页脚 */}
                <Footer></Footer>
            </div>
        )
    }
}
