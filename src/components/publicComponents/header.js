/*
// header
// --------------------------------------------------
*/

import React, { Component } from 'react';

import classNames from 'classnames';

import store from 'store';

import { Link } from 'react-router';

export default class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // 初始化 nav 的按钮样式
            isLogin:''
        };
    }

    static defaultProps = {
        // 设置 nav 默认属性
        inIndex: false,
        inUser: false,
        linkTo: '',
    };

    static propTypes = {
        // 验证 nav 的属性
        inIndex: React.PropTypes.bool.isRequired,
        inUser: React.PropTypes.bool.isRequired,
        linkTo: React.PropTypes.string.isRequired,
    };

    render() {

        // 把组件的 this 带到这里
        let me = this,
            source = me.state;

        // 找回路径缩写里面的需要用的数据
        const { isLogin } = source;

        // 需要开启的导航样式
        const headCls = classNames({
            header: true,
            index: me.props.inIndex,
            user: me.props.inUser,
        })

        let payWeLoginData = store.get('payWeLoginData');
        let user = (
            <Link to="/Login" className="header-btn-right"></Link>
        )
        if ( payWeLoginData ) {
            user = (
                <Link to="/UserCenter" className="header-btn-right"></Link>
            )
        }

        return (
            <div className={ headCls }>
                <Link to={ this.props.linkTo } className="header-btn-left"></Link>
                <p className="header-title">
                    { this.props.title }
                </p>
                { user }
            </div>
        )
    }
}
