/*
// 内页 banner
// --------------------------------------------------
*/

import React, { Component } from 'react'

export default class InSidePageBanner extends Component {

    render() {

        return (
            <div className="inside-page-banner">
                <img src={ this.props.imgUrl } alt={ this.props.alt }/>
            </div>
        )
    }
}
