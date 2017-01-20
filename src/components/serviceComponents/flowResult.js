/*
// header
// --------------------------------------------------
*/

import React, { Component } from 'react'

export default class FlowResult extends Component {

    render() {

        return (
            <div className={ this.props.florResultCls }>
                <h1>
                    <b>{ this.props.mainNotice }</b>
                </h1>
                <p>我们将尽快与您联系，请保持电话畅通</p>
                <p>如需立即获得结果，请联系客服电话：400-9928-699</p>
            </div>
        )
    }
}
