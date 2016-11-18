/*
// header
// --------------------------------------------------
*/

import React, { Component } from 'react'

export default class Footer extends Component {

    render() {
        return (
            <footer className="footer">
                <ul>
                    {
                        React.Children.map(this.props.children, function (child) {
                            return <li>{ child }</li>;
                        })
                    }
                </ul>
                <p>
                    版权所有&copy;广东钱途互联商务服务有限公司&nbsp;粤ICP备&nbsp;14098252号-1
                </p>
                <p>
                    客服电话：400-106-6698
                </p>
            </footer>
        )
    }
}
