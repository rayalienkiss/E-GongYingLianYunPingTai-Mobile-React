/*
// header
// --------------------------------------------------
*/

import React, { Component } from 'react'

import classNames from 'classnames'

import { Link } from 'react-router'

export default class Header extends Component {

    render() {

        // const headerclass = classNames (
        //     {
        //         header: true
        //     }
        // )

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
