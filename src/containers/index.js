/*
// index
// --------------------------------------------------
*/

import React, {
    Component
} from 'react'

import {
    Header,
    Footer,
    IndexPostBox,
    IndexPostBoxItem
} from 'components'

import {
    Link
} from 'react-router'

// ajax
import axios from 'axios'

export default class Home extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

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
            return axios.get('/api/daliystatistics');
        }

        //设置页面配置信息接口
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
                            applyShowNum: daliystatistics.data.data.applyShowNum,
                            registerShowAmount: daliystatistics.data.data.registerShowAmount || 0,
                            coreEnterpriseNum: assistconfig.data.data.coreEnterpriseNum,
                            UDEnterpriseNum: assistconfig.data.data.UDEnterpriseNum,
                            loanAmount: assistconfig.data.data.loanAmount
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

        //IndexPostBox 里面装的图片数据
        //合作金融机构 LOGO 图片
        const imagesGroup1 = [{
            image: require('img/index-logo/ZhaoShangYinHang.jpg')
        }, {
            image: require('img/index-logo/QianDuan.jpg')
        }, {
            image: require('img/index-logo/ZhaoShangJiJin.jpg')
        }];
        //合作核心企业 LOGO 图片
        const imagesGroup2 = [{
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
        }, {
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
        }, {
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
                <Header title="供应链云平台" linkTo="" headCls="header index-header"/>
                {/* banner */}
                <div className="index-banner">
                    <img src={ require('img/index-banner-1x1.jpg') } alt=""/>
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
                            {
                                imagesGroup1.map(i => {
                                    return (
                                        <img src={i.image} key={i.image}/>
                                    );
                                })
                            }
                        </IndexPostBoxItem>
                    </IndexPostBox>
                    {/* 合作核心企业 */}
                    <IndexPostBox>
                        <IndexPostBoxItem>
                            {
                                imagesGroup2.map(i => {
                                    return (
                                        <img src={i.image} key={i.image}/>
                                    );
                                })
                            }
                        </IndexPostBoxItem>
                    </IndexPostBox>
                </div>
                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
}
