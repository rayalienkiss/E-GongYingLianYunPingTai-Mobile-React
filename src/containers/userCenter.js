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
        router: React.PropTypes.object.isRequired
    }

    constructor( props ) {
        super( props );

        this.state = {
            data: {
                registriesTotal: 0,
                shareLogTotal: 0,
                infoName: '',
                infoHiddenPhone: '',
            },
        }
    }

    // 设置个人中心页面的数据
    setRes() {

        let me = this;

        function queryFinanceByUserIdAPI() {
            return axios.get( '/api/user/queryFinanceByUserId' );
        }

        function queryLinkUserAPI() {
            return axios.get( '/api/user/queryLinkUser' );
        }

        function infoAPI() {
            return axios.get( '/api/user/info' );
        }

        axios.all(
            [
                queryFinanceByUserIdAPI(),
                queryLinkUserAPI(),
                infoAPI(),
            ],
        )
        .then(
            axios.spread(
                function( queryFinanceByUserIdAPI,queryLinkUserAPI,infoAPI ) {
                    me.setState({
                        data: {
                            registriesTotal: queryFinanceByUserIdAPI.data.data.total,
                            shareLogTotal: queryLinkUserAPI.data.data.total,
                            infoName: infoAPI.data.data.name,
                            infoHiddenPhone: infoAPI.data.data.hiddenPhone,
                        },
                    });
                }
            )
        );
    }

    // 跳转我的登记
    toRegistries() {
        this.context.router.push( `Registries` );
    }

    // 跳转我的分享
    toShareLog() {
        this.context.router.push( `ShareLog` );
    }

    // 跳转分享步骤
    toShareLink() {
        this.context.router.push( `ShareLink` );
    }

    componentDidMount() {
        this.setRes();
    }

    render() {

        let me = this;

        let data = me.state.data;

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
                                            { data.infoName }
                                        </h4>
                                        <p>
                                            { data.infoHiddenPhone }
                                        </p>
                                    </div>
                                }
                                thumb={
                                    require( 'img/user-headshot-default.jpg' )
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
                                require( 'img/my-registries-icon.png' )
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
                                    text={ data.registriesTotal }
                                    className="in-user-center"
                                />
                            }
                            className="list-item-in-1"
                        >
                            我的登记
                        </Item>
                        <Item
                            thumb={
                                require( 'img/my-share-icon.png' )
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
                                    text={ data.shareLogTotal }
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
                                require( 'img/share-link.png' )
                            }
                            onClick={
                                me.toShareLink.bind( me )
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
