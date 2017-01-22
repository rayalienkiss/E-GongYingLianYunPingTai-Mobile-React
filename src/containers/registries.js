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
            registriesLogItem: (
                <div className="no-data"></div>
            ),
            financeEnterprise: '',
        };
    }

    searchInputOnChange( value ) {
        //console.log( value,'value' );
        this.setState({
            financeEnterprise: value,
        });
    }

    searchInputOnWork() {
        //e.preventDefault();
        this.getList();
    }

    searchInputOnClear() {
        this.setState({
            financeEnterprise: '',
        });
        //console.log( 'cancel search' );
    }

    // 设置我的登记页面的登记数据
    setRes() {
        this.getList();
    }

    getList( name ){

        let me = this;
        const { financeEnterprise } = me.state;

        this.setState({
            financeEnterprise: name || financeEnterprise,
        })

        let data = me.state.data;

        let _financeEnterprise = financeEnterprise
            _financeEnterprise = _financeEnterprise.replace(/(_|%)/g, ( match, p1 ) => {
            return '[' + p1 + ']';
        });

        let params = {
            financeEnterprise: _financeEnterprise,
            pageSize: 10,
            pageNumber: 1
        };
        //console.log( params,'params' );

        axios.post( '/api/user/queryFinanceByUserId', params )
        .then( res => {

            const code = res.data.code;

            const list = res.data.data.list;

            const { registriesLogItem } = me.state;

            if ( code == 200 && list.length > 0 ) {

                const registriesLogItem = list.map(( item, index ) => {

                    const financeStatus = item.financeStatus == 1 ? '待回访' : '已回访';
                    //console.log( item.financeStatus,'item.financeStatus' );

                    return (
                        <Item
                            multipleLine
                            arrow="horizontal"
                            extra={
                                <Badge
                                    text={ financeStatus }
                                    className="in-user-center"
                                />
                            }
                            onClick={
                                this.toRegistriesDetail.bind( this, item.id )
                            }
                            key={
                                index
                            }
                        >
                            { item.financeEnterprise }
                            <Brief>
                                { item.financeTypeName }
                            </Brief>
                        </Item>
                    );
                });
                me.setState({
                    registriesLogItem,
                });

            } else if ( code == 301 ) {

                Toast.info( '您好！请先登录账号' );
                me.context.router.push( `/Login` );

            } else if ( code == 304 ) {

                Toast.offline( '数据失联，服务器正在开小差，请稍后刷新' );

            }
        });
    }

    //跳转我的登记详细页
    toRegistriesDetail( id ) {
        this.context.router.push( `RegistriesDetail${ id }` );
    }

    componentDidMount() {
        this.setRes();
    }

    render() {

        let me = this;

        let data = me.state.data;

        const { registriesLogItem,financeEnterprise } = me.state;

        const title = '我的登记'; // 导航文案

        return (
            <div className="container-inner">
                {/* nav */}
                <Header
                    title={ title }
                    inUser={ true }
                    inRegistries={ true }
                    linkTo="/UserCenter"
                />
                <SearchBar
                    value={ financeEnterprise }
                    placeholder="请输入企业名称"
                    onSubmit={
                        me.searchInputOnWork.bind( me )
                    }
                    onChange={
                        me.searchInputOnChange.bind( me )
                    }
                    onCancel={
                        me.searchInputOnClear.bind( me )
                    }
                    className="search-in"
                  />
                <div id="gylypt-user-center" className="registries-log animated fadeIn">
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
