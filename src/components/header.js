/*
// header
// --------------------------------------------------
*/

import React, { Component } from 'react'

export default class Header extends Component {

    render() {
        return (
            <div className="header">
                <a className="header-btn"></a>
                <p className="header-title">
                    { this.props.title }
                </p>
            </div>
        )
    }
}
