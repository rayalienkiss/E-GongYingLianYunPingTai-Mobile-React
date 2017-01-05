/*
// 我的登记详细页
// --------------------------------------------------
*/

// 依赖框架
import React, { Component } from 'react'

// 公用组件
import { Header, Footer } from 'components'

// am 组件
import { Table } from 'antd-mobile';

// ajax
import axios from 'axios'

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

const data = [
    {
        label: '状态',
        content: '科多',
    },
    {
        label: '企业联系人',
        content: '萨满',
    },
    {
        label: '联系人电话',
        content: '萨满',
    },
    {
        label: '融资类型',
        content: '萨满',
    },
    {
        label: '对应核心企业',
        content: '萨满',
    },
    {
        label: '登记金额(万元)',
        content: '萨满',
    },
    {
        label: '登记时间',
        content: '萨满',
    },
    {
        label: '联系人反馈',
        content: '萨满萨满萨满萨满萨满萨满萨满萨满萨满萨满萨满萨满萨满萨满萨满萨满萨满',
    },
];

//创建并输出页面组件
export default class RegistriesDetail extends Component {

    render() {

        let me = this;

        const title = '我的登记'; // 导航文案

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
                        公司名称
                    </h2>
                    <Table
                        direction="horizon"
                        columns={ columns }
                        dataSource={ data }
                     />
                </div>
                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
}
