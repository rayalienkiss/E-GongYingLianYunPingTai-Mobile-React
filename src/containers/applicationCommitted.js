/*
// index
// --------------------------------------------------
*/

import React, {
    Component
} from 'react'

import {
    Header,
    Footer,
    FlowResult
} from 'components'

// ajax
import axios from 'axios'

import store from 'store';

export default class ApplicationCommitted extends Component {

    componentDidMount() {
        this.setLogin();
    }

    setLogin() {
        let payWeLoginData = store.get("payWeLoginData");
        if (payWeLoginData) {
            return false;
        }
        axios.get('/api/user/info').then(res => {
            store.set("payWeLoginData", {
                user: res.data.data
            });
        });
    }

    render() {

        return (
            <div className="container-inner">
                {/* nav */}
                <Header title="申请结果" linkTo="" headCls="header"/>
                {/* 流程结果 */}
                <FlowResult mainNotice="申请成功" florResultCls="flow-result success"/>
                <a className="gylypt-button primary flow-result-btn" href="#">立即分享</a>
                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
}