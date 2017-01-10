/*
// 我的登记
// --------------------------------------------------
*/

// 依赖框架
import React, { Component } from 'react'

// 公用组件
import { Header, Footer } from 'components'

// am 组件
import { List, SearchBar, Badge, Toast } from 'antd-mobile';
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
            },
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

        let me = this;

        axios.post('/api/user/queryFinanceByUserId', {})
        .then( res => {

            switch ( res.data.code ) {

                case 200:
                    me.setState({
                        code: res.data.code,
                        data: {
                            list: res.data.data.list,
                        },
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

    //跳转我的登记详细页
    toRegistriesDetail( id ) {

        console.log( id );
        this.context.router.push( `RegistriesDetail/${ id }` );

    }

    componentDidMount() {
        this.setRes();
    }

    render() {

        let me = this;

        let data = me.state.data;

        const registriesLogItem = data.list.map(( item, index ) => {

            //console.log( item,'item' );

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
                        this.toRegistriesDetail.bind(this, item.id)
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
