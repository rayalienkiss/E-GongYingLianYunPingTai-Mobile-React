/**
 * 布局框架
 *
 * by tommyshao
 */
import React, { Component } from 'react'

import { Modal,Header,Footer } from 'components'

import { Link } from 'react-router'

export default class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            modal: {
                show: true,
                content: ''
            }
        }
    }

    showModal = (content) => {
        this.setState({ modal: { show: true, content: content } })
    }
    hideModal = () => {
        this.setState({ modal: { show: false, content: ''}}, () => {
            console.log(this.state)
        })
    }

    render() {
        return (
            <div className="container">
                <div className="container-inner">
                    <Header title="供应链云平台"></Header>
                    {
                        this.props.children && React.cloneElement(this.props.children, { parent: this })
                    }
                    <Footer>
                        <Link to="" className="footer-link">关于钱途</Link>
                        <Link to="" className="footer-link">关于平台</Link>
                        <Link to="" className="footer-link">电脑版</Link>
                        <Link to="" className="footer-link">分享</Link>
                    </Footer>
                </div>
                {/* <Modal show={ this.state.modal.show } /> */}
            </div>
        )
    }
}
