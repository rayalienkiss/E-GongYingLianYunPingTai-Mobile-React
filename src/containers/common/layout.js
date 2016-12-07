/*
// 共用 layout
// --------------------------------------------------
*/

import React, { Component } from 'react'

export default class App extends Component {

    render() {
        return (
            <div className="container">
                {
                    this.props.children && React.cloneElement(this.props.children, { parent: this })
                }
            </div>
        )
    }
}
