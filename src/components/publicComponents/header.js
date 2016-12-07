/*
// header
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Link } from 'react-router'

export default class Header extends Component {

    render() {

        return (
            <div className={ this.props.headCls }>
                <Link to={ this.props.linkTo } className="header-btn"></Link>
                <p className="header-title">
                    { this.props.title }
                </p>
            </div>
        )
    }
}
