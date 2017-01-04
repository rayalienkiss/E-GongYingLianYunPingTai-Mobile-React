/*
// 个人中心
// --------------------------------------------------
*/

// 依赖框架
import React, { Component } from 'react'

// 公用组件
import { Header, Footer } from 'components'

// am 组件
import { Card, WhiteSpace, Icon, List, Button, Badge } from 'antd-mobile';
const Item = List.Item;

// react-router 组件
import { Link } from 'react-router';

// ajax
import axios from 'axios'

//创建并输出页面组件
export default class UserCenter extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    // 跳转我的登记
    toRegistries() {
        this.context.router.push(`Registries`);
    }

    // 跳转我的分享
    toShareLog() {
        this.context.router.push(`ShareLog`);
    }

    // 跳转分享步骤
    toShareLink() {
        this.context.router.push(`ShareLink`);
    }

    render() {

        let me = this;

        const title = '个人中心'; // 导航文案

        return (
            <div className="container-inner">
                {/* nav */}
                <Header
                    title={ title }
                    inUser={ true }
                />
                <div id="gylypt-user-center">
                    <Link to="BaseInfo">
                        <Card
                            full
                            className="card-in"
                        >
                            <Card.Header
                                title={
                                    <div className="user-name">
                                        <h4>
                                            犬志龙
                                        </h4>
                                        <p>
                                            13570578445
                                        </p>
                                    </div>
                                }
                                thumb={
                                    require('img/user-headshot-default.jpg')
                                }
                                extra={
                                    <Icon type="setting"></Icon>
                                }
                            />
                        </Card>
                    </Link>
                    <List>
                        <Item
                            thumb={
                                require('img/my-registries-icon.png')
                            }
                            arrow={
                                "horizontal"
                            }
                            onClick={
                                me.toRegistries.bind(me)
                            }
                            extra={
                                <Badge
                                    overflowCount = { 9999 }
                                    text={ 5 }
                                    className="in-user-center"
                                />
                            }
                            className="list-item-in-1"
                        >
                            我的登记
                        </Item>
                        <Item
                            thumb={
                                require('img/my-share-icon.png')
                            }
                            arrow={
                                "horizontal"
                            }
                            onClick={
                                me.toShareLog.bind(me)
                            }
                            extra={
                                <Badge
                                    overflowCount = { 9999 }
                                    text={ 102 }
                                    className="in-user-center"
                                />
                            }
                            className="list-item-in-2"
                        >
                            我的分享
                        </Item>
                        <Item
                            arrow={
                                "horizontal"
                            }
                            thumb={
                                require('img/share-link.png')
                            }
                            onClick={
                                me.toShareLink.bind(me)
                            }
                            className="list-item-in-3"
                        >
                            推广链接分享
                        </Item>
                    </List>
                    <div className="gylypt-single-button-wrap button-in">
                        <Button type="default">退出登录</Button>
                    </div>
                </div>
                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
}
