/*
// 申请表单
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Header,Footer,InsidePageBanner } from 'components'

//import { Button,Card,WingBlank,WhiteSpace,List,Radio } from 'antd-mobile'

import { Button } from 'antd-mobile'

// ajax
import axios from 'axios'

//const RadioItem = Radio.RadioItem;

export default class Application extends Component {

    // getInitialState() {
    //     return {value: 1};
    // }
    // onChange(value) {
    //     this.setState({value});
    // }

    render() {

        const imgUrl = "../src/public/images/inside-page-banner-1.jpg";

        // const { value } = this.state;
        //
        // const data = [
        //     {
        //         value: 0,
        //         label: '博士'
        //     },
        //     {
        //         value: 1,
        //         label: '本科'
        //     },
        //     {
        //         value: 2,
        //         label: '高中'
        //     }
        // ];

        return (
            <div className="container-inner">
                {/* nav */}
                <Header title="申请资料填写" linkTo="" headCls="header"/>
                {/* 内页banner */}
                <InsidePageBanner imgUrl={ imgUrl } alt=""/>


                {/* test */}
                {/* <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <Card>
                        <Card.Header title="融资需求登记" />
                        <Card.Body>
                            <div>
                                {
                                    data.map(i => (
                                        <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
                                            {i.label}
                                        </RadioItem>
                                    ))
                                }
                            </div>
                        </Card.Body>
                    </Card>
                    <WhiteSpace size="lg" />
                </WingBlank> */}
                <Button className="btn" data-seed="logId" onClick={e => console.log(e)}>default 按钮</Button>


                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
}
