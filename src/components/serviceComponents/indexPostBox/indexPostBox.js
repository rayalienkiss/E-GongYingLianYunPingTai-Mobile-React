/*
// 首页的 logo 群排列组件
// --------------------------------------------------
*/

import React, { Component } from 'react'

export default class IndexPostBox extends Component {

    render() {

        return (
            <ul className="index-post-box">
                {
                    this.props.children && React.cloneElement(this.props.children, { parent: this })
                }
            </ul>
        )
    }
}
