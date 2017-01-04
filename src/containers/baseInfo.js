/*
// 基础信息
// --------------------------------------------------
*/

// 依赖框架
import React, { Component } from 'react'

// 公用组件
import { Header, Footer } from 'components'

// am 组件
import { Card, WhiteSpace, Icon, List, Button, Modal, WingBlank } from 'antd-mobile';
const Item = List.Item;
const prompt = Modal.prompt;

// react-router 组件
import { Link } from 'react-router';

// ajax
import axios from 'axios'

//创建并输出页面组件
export default class BaseInfo extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    // 跳转我的登记
    toRegistries() {
        this.context.router.push(`/`);
    }

    // 跳转我的分享
    toShareLog() {
        this.context.router.push(`/`);
    }

    // 跳转分享步骤
    toShareLink() {
        this.context.router.push(`/`);
    }

    render() {

        let me = this;

        const title = '基础信息'; // 导航文案

        return (
            <div className="container-inner">
                {/* nav */}
                <Header
                    title={ title }
                    inUser={ true }
                    linkTo="UserCenter"
                />
                <div id="gylypt-user-center" className="base-info">
                    <List>
                        <Item
                            extra="犬志龙"
                            className="list-item-in-1"
                        >
                            真实姓名
                        </Item>
                        <Item
                            extra="13700137000"
                            className="list-item-in-2"
                        >
                            手机号码
                        </Item>
                        <Item
                            extra="13700137000@163.com"
                            className="list-item-in-3"
                        >
                            电子邮件
                        </Item>
                        <Item
                            arrow={
                                "horizontal"
                            }
                            extra="广东对外贸易合作有限公司"
                            className="list-item-in-4"
                            onClick={ () => prompt(
                                '编辑单位名称',
                                <span className="fontcolor-vice">推荐人所在单位名称</span>,
                                [
                                    { text: '取消' },
                                    { text: '提交', onPress: value => console.log(`输入的内容:${value}`) },
                                ],
                                'plain-text', '100'
                            )}
                        >
                            单位名称
                        </Item>
                    </List>
                </div>
                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
}
