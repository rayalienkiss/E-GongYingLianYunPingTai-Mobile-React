/*
// index
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Header, Footer, IndexPostBox, IndexPostBoxItem } from 'components'

import { Link } from 'react-router'

import { Carousel, NavBar, Icon } from 'antd-mobile';

// ajax
import axios from 'axios'

export default class Home extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            //初始化首页当日融资记录接口拿到得数据
            daliystatistics: {
                applyShowNum: 0,
                registerShowAmount: 0,
            },
            //初始化首页配置信息接口拿到得数据
            assistconfig: {
                coreEnterpriseNum: 0,
                UDEnterpriseNum: 0,
                loanAmount: 0,
            },
        }
    }

    //定义获取首页数据接口的方法
    statisticsLive() {

        // 拿到组件 Home 的 this 赋值给当前域
        let self = this;

        //设置当日融资记录接口
        function getDaliyStatistics() {
            return axios.get('/api/daliystatistics');
        }

        //设置首页配置信息接口
        function getAssistConfig() {
            return axios.get('/api/assistconfig');
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
                        self.setState({
                            //重新渲染首页当日融资记录接口拿到得数据
                            daliystatistics: {
                                applyShowNum: daliystatistics.data.data.applyShowNum || 0,
                                registerShowAmount: daliystatistics.data.data.registerShowAmount || 0,
                            },
                            //重新渲染首页配置信息接口拿到得数据
                            assistconfig: {
                                coreEnterpriseNum: assistconfig.data.data.coreEnterpriseNum || 0,
                                UDEnterpriseNum: assistconfig.data.data.UDEnterpriseNum || 0,
                                loanAmount: assistconfig.data.data.loanAmount || 0,
                            },
                        });
                    }
                )
            );
    }

    componentDidMount() {
        let {
            location
        } = this.props;
        let {
            router
        } = this.context;
        // console.log(query)
        if (location.query.t) {
            router.push("/application?linkCode=" + location.query.t);
            return false;
        }

        //组件 Home 执行获取数据任务
        this.statisticsLive();
    }

    render() {

        //把组件的 this 带到这里
        let me = this,
            //把状态机里面的数据层路径缩写
            source = me.state,
            statistics = source.daliystatistics,
            config = source.assistconfig;

        //找回路径缩写里面的需要用的数据
        const { applyShowNum, registerShowAmount } = statistics,
              { coreEnterpriseNum, UDEnterpriseNum, loanAmount } = config;

        //IndexPostBox 里面装的图片数据
        //合作金融机构 LOGO 图片
        const imagesGroup1 = [{
            image: require('img/index-logo/ZhaoShangYinHang.jpg')
        }, {
            image: require('img/index-logo/QianDuan.jpg')
        }, {
            image: require('img/index-logo/ZhaoShangJiJin.jpg')
        }];

        // v1.3版本 合作核心企业 LOGO 组别（一）
        const theCentralImg1 = [{
            image: require('img/index-logo/WanKe.jpg')
        }, {
            image: require('img/index-logo/ZhongHaiDiChan.jpg')
        }, {
            image: require('img/index-logo/HuaRunZhiDi.jpg')
        }, {
            image: require('img/index-logo/AnBangBaoXian.jpg')
        }, {
            image: require('img/index-logo/ZhongGuoRenBao.jpg')
        }, {
            image: require('img/index-logo/JiuZhouTong.jpg')
        }];

        // v1.3版本 合作核心企业 LOGO 组别（二）
        const theCentralImg2 = [{
            image: require('img/index-logo/PuTianYaoXieJiaoYiWang.jpg')
        }, {
            image: require('img/index-logo/MeiLuoYaoYe.jpg')
        }, {
            image: require('img/index-logo/JinHaiMaJiaJu.jpg')
        }, {
            image: require('img/index-logo/YunShengKeJi.jpg')
        }, {
            image: require('img/index-logo/CrownePlaza.jpg')
        }, {
            image: require('img/index-logo/GongSuDa.jpg')
        }];

        // v1.3版本 合作核心企业 LOGO 组别（三）
        const theCentralImg3 = [{
            image: require('img/index-logo/HaiTian.jpg')
        }, {
            image: require('img/index-logo/HongDouJiaFang.jpg')
        }, {
            image: require('img/index-logo/JingBoWuLiu.jpg')
        }, {
            image: require('img/index-logo/MengNiu.jpg')
        }, {
            image: require('img/index-logo/ShanDongGaoSu.jpg')
        }, {
            image: require('img/index-logo/ShengMuGaoKe.jpg')
        }];

        return (
            <div className="container-inner">
                {/* nav */}
                <Header inIndex={ true }/>
                {/* banner */}
                <div className="index-banner">
                    <img src={ require('img/index-banner-1x1.jpg') } alt=""/>
                    <Link className="gylypt-button primary index-banner-btn" to="application">
                        <b>立即登记</b>
                    </Link>
                </div>
                {/* 实时统计滚动 */}
                <div className="the-statistics-live">
                    <Carousel className="index-statistics-live-v1_3" dots={ false } dragging={ false } autoplay infinite vertical>
                        <div className="isl-item">
                            今日登记：
                            <span className="fontcolor-warning">
                                { applyShowNum }
                            </span>
                            &nbsp;笔
                        </div>
                        <div className="isl-item">
                            登记金额：
                            <span className="fontcolor-warning">
                                { registerShowAmount }
                            </span>
                            &nbsp;元
                        </div>
                    </Carousel>
                </div>
                {/* 统计广告 */}
                <div className="index-statistics">
                    {/* 静态统计 */}
                    <ul className="index-statistics">
                        <li>
                            <p>
                                核心企业
                            </p>
                            <p>
                                <span>{ coreEnterpriseNum }+</span>
                                家
                            </p>
                        </li>
                        <li>
                            <p>
                                上下游企业
                            </p>
                            <p>
                                <span>{ UDEnterpriseNum }+</span>
                                家
                            </p>
                        </li>
                        <li>
                            <p>
                                已放款金额
                            </p>
                            <p>
                                <span>{ loanAmount }+</span>
                                万元
                            </p>
                        </li>
                    </ul>

                    {/* 实时统计 (这种结构在 v1.3 版本去除)*/}
                    {/* <div className="index-statistics-live">
                        <p>
                            今日登记：<span>{ this.state.applyShowNum }</span>&nbsp;笔
                        </p>
                        <p>
                            登记金额：<span>{ this.state.registerShowAmount }</span>&nbsp;元
                        </p>
                    </div> */}

                </div>
                {/* 战略合作 */}
                <div className="index-post">
                    <h1>
                        <b>战略合作</b>
                    </h1>

                    {/* 合作金融机构 */}
                    <IndexPostBox>
                        <IndexPostBoxItem>
                            {
                                imagesGroup1.map(i => {
                                    return (
                                        <img src={i.image} key={i.image}/>
                                    );
                                })
                            }
                        </IndexPostBoxItem>
                    </IndexPostBox>

                    {/* 合作核心企业 (这种结构在 v1.3 版本去除)*/}
                    {/* <IndexPostBox>
                        <IndexPostBoxItem>
                            {
                                imagesGroup2.map(i => {
                                    return (
                                        <img src={i.image} key={i.image}/>
                                    );
                                })
                            }
                        </IndexPostBoxItem>
                    </IndexPostBox> */}

                    {/* 合作核心企业 */}
                    <div className="the-central">
                        <Carousel className="the-central-items" dots={ false } autoplay infinite>
                            <div className="the-central-item">
                                {
                                    theCentralImg1.map((i,index) => {
                                        return (
                                            <p key={ index }>
                                                <img src={i.image}/>
                                            </p>
                                        );
                                    })
                                }
                            </div>
                            <div className="the-central-item">
                                {
                                    theCentralImg2.map((i,index) => {
                                        return (
                                            <p key={ index }>
                                                <img src={i.image}/>
                                            </p>
                                        );
                                    })
                                }
                            </div>
                            <div className="the-central-item">
                                {
                                    theCentralImg3.map((i,index) => {
                                        return (
                                            <p key={ index }>
                                                <img src={i.image}/>
                                            </p>
                                        );
                                    })
                                }
                            </div>
                        </Carousel>
                    </div>

                </div>
                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
}
