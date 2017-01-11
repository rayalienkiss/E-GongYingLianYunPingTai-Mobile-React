/*
// 我的分享
// --------------------------------------------------
*/

// 依赖框架
import React, { Component } from 'react'

// 公用组件
import { Header, Footer } from 'components'

// am 组件
import { List, Badge, Toast } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

// ajax
import axios from 'axios'

//创建并输出页面组件
export default class ShareLog extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor( props ) {
        super( props );

        this.state = {
            shareLogItem: (
                <div className="no-data"></div>
            ),
        }
    }

    // 设置我的分享页面的分享数据
    setShareLogRes() {

        let me = this;

        axios.get(
            '/api/user/queryLinkUser'
        )
        .then( res => {

            const code = res.data.code;

            const list = res.data.data.list;
            //console.log( list,'list' );

            const { shareLogItem } = me.state;
            //console.log( shareLogItem,'shareLogItem' );

            if ( code == 200 && list.length > 0 ) {

                const shareLogItem = list.map(( item, index ) => {

                    function haveCompanyNameOrNot() {
                        if ( !item.enterprise ) {
                            return (
                                <small>未保存单位名称</small>
                            );
                        } else {
                            return (
                                <small className="fontcolor-vice">{ item.enterprise }</small>
                            );
                        }
                    }

                    return (
                        <Item
                            multipleLine
                            extra={
                                <Badge
                                    text='已注册'
                                    className="in-user-center"
                                />
                            }
                            key={ index }
                        >
                            <div className="share-log-item-main">
                                <div className="name">
                                    { item.name }
                                </div>
                                <div className="company">
                                    （<span>{ haveCompanyNameOrNot() }</span>）
                                </div>
                            </div>
                            <Brief>
                                <span className="fontcolor-heading">
                                    { item.hiddenPhone }
                                </span>
                            </Brief>
                        </Item>
                    );
                });
                me.setState({
                    shareLogItem,
                });

            } else if ( code == 301 ) {

                Toast.info( '您好！请先登录账号' );
                me.context.router.push( `/Login` );

            } else if ( code == 304 ) {

                Toast.offline( '数据失联，服务器正在开小差，请稍后刷新' );

            }
        });
    }

    componentDidMount() {
        this.setShareLogRes();
    }

    render() {

        let me = this;

        let data = me.state.data;

        const { shareLogItem } = me.state;

        const title = '我的分享';

        return (
            <div className="container-inner">
                {/* nav */}
                <Header
                    title={ title }
                    inUser={ true }
                    linkTo="UserCenter"
                />
                <div id="gylypt-user-center" className="share-log animated fadeIn">
                    <List>
                        { shareLogItem }
                    </List>
                </div>
                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
}
