/*
// 我的分享
// --------------------------------------------------
*/

// 依赖框架
import React, { Component } from 'react'

// 公用组件
import { Header, Footer } from 'components'

// am 组件
import { List, Badge } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

// ajax
import axios from 'axios'

//创建并输出页面组件
export default class ShareLog extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            data: {
                list: [],
            },
        }
    }

    // 设置我的分享页面的分享数据
    setShareLogRes() {

        // 拿到组件 ShareLog 的 this 赋值给当前域
        let me = this;

        //获取我的分享页面的接口
        function queryLinkUserAPI() {
            return axios.get( '/api/user/queryLinkUser' );
        }

        //调用 我的分享页面 的接口
        //axios 用法 https://github.com/mzabriskie/axios
        axios.all(
            [
                queryLinkUserAPI(),
            ],
        )
        .then(
            axios.spread(
                function(res) {
                    me.setState({
                        data: {
                            list: res.data.data.list,
                        },
                    });
                }
            )
        );
    }

    componentDidMount() {
        this.setShareLogRes();
    }

    render() {

        let me = this;

        let data = me.state.data;

        const title = '我的分享';

        const shareLogItem = data.list.map(( item, index ) => {
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
                            （ <span>{ item.enterprise }</span> ）
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
