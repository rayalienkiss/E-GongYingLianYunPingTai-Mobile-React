/*
// 我的登记
// --------------------------------------------------
*/

// 依赖框架
import React, { Component } from 'react'

// 公用组件
import { Header, Footer } from 'components'

// am 组件
import { List, SearchBar, Badge } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

// ajax
import axios from 'axios'

//创建并输出页面组件
export default class Registries extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    constructor( props ) {
        super( props );
        this.state = {
            value: '',
            data: {
                list: [],
            }
        };
    }

    onChange( value ) {
        this.setState({ value });
    }

    clear() {
        this.setState({ value: '' });
    }

    // 设置我的登记页面的登记数据
    setRes() {

        // 拿到组件 Registries 的 this 赋值给当前域
        let me = this;

        //获取我的登记页面的接口
        function queryFinanceByUserIdAPI() {
            return axios.get( '/api/user/queryFinanceByUserId' );
        }

        //调用 我的登记页面 的接口
        //axios 用法 https://github.com/mzabriskie/axios
        axios.all(
            [
                queryFinanceByUserIdAPI(),
            ],
        )
        .then(
            axios.spread(
                function( queryFinanceByUserIdAPI ) {
                    me.setState({
                        data: {
                            list: queryFinanceByUserIdAPI.data.data.list,
                        },
                    });
                }
            )
        );
    }

    //跳转我的登记详细页
    toRegistriesDetail() {
        this.context.router.push( `RegistriesDetail` );
    }

    componentDidMount() {
        this.setRes();
    }

    render() {

        let me = this;

        let data = me.state.data;

        const registriesLogItem = data.list.map(( item, index ) => {
            return (
                <Item
                    multipleLine
                    arrow="horizontal"
                    extra={
                        <Badge
                            text="未回访"
                            className="in-user-center"
                        />
                    }
                    onClick={
                        me.toRegistriesDetail.bind( me )
                    }
                    key={
                        index
                    }
                >
                    { item.coreEnterprises }
                    <Brief>{ item.financeTypeName }</Brief>
                </Item>
            );
        });

        const title = '我的登记'; // 导航文案

        return (
            <div className="container-inner">
                {/* nav */}
                <Header
                    title={ title }
                    inUser={ true }
                    linkTo="UserCenter"
                />
                <SearchBar
                    value={ this.state.value }
                    placeholder="搜索"
                    onSubmit={(value) => console.log(value, 'onSubmit')}
                    onClear={(value) => console.log(value, 'onClear')}
                    onFocus={() => console.log('onFocus')}
                    onBlur={() => console.log('onBlur')}
                    onChange={ this.onChange.bind(this) }
                    className="search-in"
                  />
                <div id="gylypt-user-center" className="share-log animated fadeInDown">
                    <List>
                        { registriesLogItem }
                    </List>
                </div>
                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
}
