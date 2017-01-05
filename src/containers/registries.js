/*
// 我的登记
// --------------------------------------------------
*/

// 依赖框架
import React, { Component } from 'react'

// 公用组件
import { Header, Footer } from 'components'

// am 组件
import { List, SearchBar } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

// ajax
import axios from 'axios'

//创建并输出页面组件
export default class Registries extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            value: '',
        };
    }

    onChange( value ) {
        this.setState({ value });
    }

    clear() {
        this.setState({ value: '' });
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    //跳转我的登记详细页
    toRegistriesDetail() {
        this.context.router.push(`RegistriesDetail`);
    }

    render() {

        let me = this;

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
                        <Item
                            multipleLine
                            arrow="horizontal"
                            extra="待回访"
                            onClick={
                                me.toRegistriesDetail.bind(me)
                            }
                        >
                            广东对外贸易合作有限公司<Brief>应收账款融资</Brief>
                        </Item>
                    </List>
                </div>
                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
}
