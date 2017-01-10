/*
// 我的登记详细页
// --------------------------------------------------
*/

// 依赖框架
import React, { Component } from 'react'

// 公用组件
import { Header, Footer } from 'components'

// am 组件
import { Table, Toast } from 'antd-mobile';

// ajax
import axios from 'axios'

//创建并输出页面组件
export default class RegistriesDetail extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    constructor( props ) {
        super( props );

        this.state = {
            data: {
                amount: '',
                contactsName: '',
                contactsPhone: '',
                coreEnterprises: '',
                createTime: '',
                financeEnterprise: '',
                feedbackContent: '',
                financeStatus: '',
                name: '',
            },
        }
    }

    // 设置我的分享页面的分享数据
    setRes() {

        let me = this;

        const id = this.props.params.financeEnterpriseId;

        axios.post(
            '/api/user/queryFinanceByUserIdFinanceId',
            {
                financeEnterpriseId: id,
            }
        )
        .then( res => {

            let data = res.data.data

            switch ( res.data.code ) {
                case 200:
                    me.setState({
                        data
                    });
                    break;

                case 301:
                    Toast.info('您好！请先登录账号');
                    me.context.router.push(`/Login`);
                    break;

                case 304:
                    Toast.offline('数据失联，服务器正在开小差，请稍后刷新');
                    break;

                default:
            }
        });
    }

    componentDidMount() {
        this.setRes();
    }

    render() {

        let me = this;

        let data = me.state.data;

        const title = '我的登记'; // 导航文案

        const financeStatus = data.financeStatus == 1 ? '已回访' : '未回访';

        const columns = [
            {
                title: '标签',
                dataIndex: 'label',
                key: 'label',
                width: 110,
            },
            {
                title: '内容',
                dataIndex: 'content',
                key: 'content',
            },
        ];

        const tableRes = [
            {
                label: '状态',
                content: financeStatus, //接口返回 1 为跟踪中，2 为未跟中，通过上面的 const financeStatus = data.financeStatus == 1 ? "跟踪中" : "未跟踪"; 进行展示形式转化
            },
            {
                label: '企业联系人',
                content: data.contactsName,
            },
            {
                label: '联系人电话',
                content: data.contactsPhone,
            },
            {
                label: '融资类型',
                content: data.name,
            },
            {
                label: '对应核心企业',
                content: data.coreEnterprises,
            },
            {
                label: '登记金额(万元)',
                content: data.amount,
            },
            {
                label: '登记时间',
                content: data.createTime,
            },
            {
                label: '联系人反馈',
                content: data.feedbackContent,
            },
        ];

        return (
            <div className="container-inner">
                {/* nav */}
                <Header
                    title={ title }
                    inUser={ true }
                    linkTo="Registries"
                />
                <div id="gylypt-user-center">
                    <h2 className="title border">
                        { data.financeEnterprise }
                    </h2>
                    <Table
                        direction="horizon"
                        columns={ columns }
                        dataSource={ tableRes }
                     />
                </div>
                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
}
