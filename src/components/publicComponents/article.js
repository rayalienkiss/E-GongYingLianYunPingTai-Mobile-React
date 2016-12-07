/*
// 文章盒子
// --------------------------------------------------
*/

import React, { Component } from 'react'

export default class Article extends Component {

    render() {

        return (
            <article className={this.props.articleCls}>
                <h1 className="gylpt-article-title">
                    <b>
                        {this.props.articleTitle}
                    </b>
                </h1>
                <div>
                    {
                        this.props.children && React.cloneElement(this.props.children, { parent: this })
                    }
                </div>
            </article>
        )
    }
}
