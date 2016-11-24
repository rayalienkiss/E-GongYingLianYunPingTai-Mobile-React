/*
// index
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Header,Footer } from 'components'

import { Link } from 'react-router'

// ajax
import axios from 'axios'

export default class Home extends Component {

    render() {
        return (
            <div className="container-inner">
                {/* nav */}
                <Header title="供应链云平台" linkTo="" headCls="header index-header"></Header>
                {/* banner */}
                <div className="index-banner">
                    <img src="../src/public/images/index-banner-1x1.jpg" alt=""/>
                    <Link className="gylypt-button primary index-banner-btn" to="applicationCommitted">
                        <b>立即登记</b>
                    </Link>
                </div>
                {/* 统计广告 */}
                <div className="index-statistics">
                    {/* 静态统计 */}
                    <ul className="index-statistics">
                        <li>
                            <p>核心企业</p>
                            <p><span>200+</span>家</p>
                        </li>
                        <li>
                            <p>上下游企业</p>
                            <p><span>20,000+</span>家</p>
                        </li>
                        <li>
                            <p>已放款金额</p>
                            <p><span>300,000+</span>万元</p>
                        </li>
                    </ul>
                    {/* 实时统计 */}
                    <div className="index-statistics-live">
                        <p>
                            今日登记：<span>888</span>&nbsp;笔
                        </p>
                        <p>
                            登记金额：<span>88,888,888</span>&nbsp;元
                        </p>
                    </div>
                </div>
                {/* 战略合作 */}
                <div className="index-post">
                    <h1>
                        <b>战略合作</b>
                    </h1>
                    {/* 合作金融机构 */}
                    <ul className="index-post-box">
                        <li>
                            <p>
                                <img src="../src/public/images/index-logo/ZhaoShangYinHang.jpg" alt=""/>
                            </p>
                            <p>
                                <img src="../src/public/images/index-logo/QianDuan.jpg" alt=""/>
                            </p>
                            <p>
                                <img src="../src/public/images/index-logo/ZhaoShangJiJin.jpg" alt=""/>
                            </p>
                        </li>
                    </ul>
                    {/* 合作核心企业 */}
                    <ul className="index-post-box">
                        <li>
                            <p>
                                <img src="../src/public/images/index-logo/Wanke.jpg" alt=""/>
                            </p>
                            <p>
                                <img src="../src/public/images/index-logo/ZhongHaiDiChan.jpg" alt=""/>
                            </p>
                            <p>
                                <img src="../src/public/images/index-logo/HuaRunZhiDi.jpg" alt=""/>
                            </p>
                            <p>
                                <img src="../src/public/images/index-logo/AnBangBaoXian.jpg" alt=""/>
                            </p>
                            <p>
                                <img src="../src/public/images/index-logo/ZhongGuoRenBao.jpg" alt=""/>
                            </p>
                            <p>
                                <img src="../src/public/images/index-logo/JiuZhouTong.jpg" alt=""/>
                            </p>
                            <p>
                                <img src="../src/public/images/index-logo/PuTianYaoXieJiaoYiWang.jpg" alt=""/>
                            </p>
                            <p>
                                <img src="../src/public/images/index-logo/MeiLuoYaoYe.jpg" alt=""/>
                            </p>
                            <p>
                                <img src="../src/public/images/index-logo/JinHaiMaJiaJu.jpg" alt=""/>
                            </p>
                            <p>
                                <img src="../src/public/images/index-logo/YunShengKeJi.jpg" alt=""/>
                            </p>
                            <p>
                                <img src="../src/public/images/index-logo/CrownePlaza.jpg" alt=""/>
                            </p>
                            <p>
                                <img src="../src/public/images/index-logo/GongSuDa.jpg" alt=""/>
                            </p>
                            <p>
                                <img src="../src/public/images/index-logo/HaiTian.jpg" alt=""/>
                            </p>
                            <p>
                                <img src="../src/public/images/index-logo/HongDouJiaFang.jpg" alt=""/>
                            </p>
                            <p>
                                <img src="../src/public/images/index-logo/JingBoWuLiu.jpg" alt=""/>
                            </p>
                            <p>
                                <img src="../src/public/images/index-logo/MengNiu.jpg" alt=""/>
                            </p>
                            <p>
                                <img src="../src/public/images/index-logo/ShanDongGaoSu.jpg" alt=""/>
                            </p>
                            <p>
                                <img src="../src/public/images/index-logo/ShengMuGaoKe.jpg" alt=""/>
                            </p>
                        </li>
                    </ul>
                </div>
                {/* 页脚 */}
                <Footer></Footer>
            </div>
        )
    }
}
