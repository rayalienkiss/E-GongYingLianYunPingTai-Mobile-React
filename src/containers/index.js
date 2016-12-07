/*
// index
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Header,Footer,IndexPostBox,IndexPostBoxItem } from 'components'

import { Link } from 'react-router'

// ajax
import axios from 'axios'

export default class Home extends Component {

    constructor(props) {
        super(props);

        //初始化首页展示数据
        this.state = {
            applyShowNum: 0,
            registerShowAmount: 0,
            coreEnterpriseNum: 0,
            UDEnterpriseNum: 0,
            loanAmount: 0
        }
    }

    //定义获取首页数据接口的方法
    statisticsLive() {

        // 拿到组件 Home 的 this 赋值给当前域
        let self = this;

        //设置当日融资记录接口
        function getDaliyStatistics() {
            return axios.get('/API/daliystatistics');
        }

        //设置页面配置信息接口
        function getAssistConfig() {
            return axios.get('/API/assistconfig');
        }

        //同时调用 页面配置信息 和 当日融资记录 两个接口
        //axios 用法 https://github.com/mzabriskie/axios
        axios.all(
            [
                getDaliyStatistics(),
                getAssistConfig()
            ]
        )
        .then(
            axios.spread(
                function(daliystatistics, assistconfig) {
                    //渲染新的首页数据
                    self.setState ({
                        applyShowNum: daliystatistics.data.data.applyShowNum,
                        registerShowAmount: daliystatistics.data.data.registerShowAmount,
                        coreEnterpriseNum: assistconfig.data.data.coreEnterpriseNum,
                        UDEnterpriseNum: assistconfig.data.data.UDEnterpriseNum,
                        loanAmount: assistconfig.data.data.loanAmount
                    });
                }
            )
        );
    }

    componentDidMount() {

        //组件 Home 执行获取数据任务
        this.statisticsLive();
    }

    render() {
        return (
            <div className="container-inner">
                {/* nav */}
                <Header title="供应链云平台" linkTo="" headCls="header index-header"/>
                {/* banner */}
                <div className="index-banner">
                    <img src="../src/public/images/index-banner-1x1.jpg" alt=""/>
                    <Link className="gylypt-button primary index-banner-btn" to="application">
                        <b>立即登记</b>
                    </Link>
                </div>
                {/* 统计广告 */}
                <div className="index-statistics">
                    {/* 静态统计 */}
                    <ul className="index-statistics">
                        <li>
                            <p>核心企业</p>
                            <p><span>{ this.state.coreEnterpriseNum }+</span>家</p>
                        </li>
                        <li>
                            <p>上下游企业</p>
                            <p><span>{ this.state.UDEnterpriseNum }+</span>家</p>
                        </li>
                        <li>
                            <p>已放款金额</p>
                            <p><span>{ this.state.loanAmount }+</span>万元</p>
                        </li>
                    </ul>
                    {/* 实时统计 */}
                    <div className="index-statistics-live">
                        <p>
                            今日登记：<span>{ this.state.applyShowNum }</span>&nbsp;笔
                        </p>
                        <p>
                            登记金额：<span>{ this.state.registerShowAmount }</span>&nbsp;元
                        </p>
                    </div>
                </div>
                {/* 战略合作 */}
                <div className="index-post">
                    <h1>
                        <b>战略合作</b>
                    </h1>
                    {/* 合作金融机构 */}
                    <IndexPostBox>
                        <IndexPostBoxItem>
                            <img src="../src/public/images/index-logo/ZhaoShangYinHang.jpg" alt=""/>
                            <img src="../src/public/images/index-logo/QianDuan.jpg" alt=""/>
                            <img src="../src/public/images/index-logo/ZhaoShangJiJin.jpg" alt=""/>
                        </IndexPostBoxItem>
                    </IndexPostBox>
                    {/* 合作核心企业 */}
                    <IndexPostBox>
                        <IndexPostBoxItem>
                            <img src="../src/public/images/index-logo/Wanke.jpg" alt=""/>
                            <img src="../src/public/images/index-logo/ZhongHaiDiChan.jpg" alt=""/>
                            <img src="../src/public/images/index-logo/HuaRunZhiDi.jpg" alt=""/>
                            <img src="../src/public/images/index-logo/AnBangBaoXian.jpg" alt=""/>
                            <img src="../src/public/images/index-logo/ZhongGuoRenBao.jpg" alt=""/>
                            <img src="../src/public/images/index-logo/JiuZhouTong.jpg" alt=""/>
                            <img src="../src/public/images/index-logo/PuTianYaoXieJiaoYiWang.jpg" alt=""/>
                            <img src="../src/public/images/index-logo/MeiLuoYaoYe.jpg" alt=""/>
                            <img src="../src/public/images/index-logo/JinHaiMaJiaJu.jpg" alt=""/>
                            <img src="../src/public/images/index-logo/YunShengKeJi.jpg" alt=""/>
                            <img src="../src/public/images/index-logo/CrownePlaza.jpg" alt=""/>
                            <img src="../src/public/images/index-logo/GongSuDa.jpg" alt=""/>
                            <img src="../src/public/images/index-logo/HaiTian.jpg" alt=""/>
                            <img src="../src/public/images/index-logo/HongDouJiaFang.jpg" alt=""/>
                            <img src="../src/public/images/index-logo/JingBoWuLiu.jpg" alt=""/>
                            <img src="../src/public/images/index-logo/MengNiu.jpg" alt=""/>
                            <img src="../src/public/images/index-logo/ShanDongGaoSu.jpg" alt=""/>
                            <img src="../src/public/images/index-logo/ShengMuGaoKe.jpg" alt=""/>
                        </IndexPostBoxItem>
                    </IndexPostBox>
                </div>
                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
}
