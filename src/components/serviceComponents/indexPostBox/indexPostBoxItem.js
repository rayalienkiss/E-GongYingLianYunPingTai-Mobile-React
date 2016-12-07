/*
// 首页的 logo 群排列组件下的 li 结构，每个 li 放一定数量的 logo，为了后面可以做成焦点图交互不用改结构
// --------------------------------------------------
*/

import React, { Component } from 'react'

export default class IndexPostBoxItem extends Component {

    render() {

        return (
            <li>
                {
                    React.Children.map(this.props.children, function(child) {
                        return <p>{ child }</p>;
                    })
                }
            </li>
        )
    }
}
