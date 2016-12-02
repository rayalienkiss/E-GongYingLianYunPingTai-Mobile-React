/*
// 申请表单
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Header,Footer,InsidePageBanner } from 'components'

//import { Button,Card,WingBlank,WhiteSpace,List,Radio } from 'antd-mobile'

import { Button, Card, WingBlank, WhiteSpace, List, Radio, Flex } from 'antd-mobile'

// ajax
import axios from 'axios'

const RadioItem = Radio.RadioItem;

export default class Application extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
    }
    onChange(value) {
        this.setState({
            value,
        });
    }

    render() {

        //页面 banner 图片地址
        const imgUrl = "../src/public/images/inside-page-banner-1.jpg";

        //表单单选项参数设置
        const { value } = this.state;
        const data = [
            {
                value: 0,
                label: '博士'
            },
            {
                value: 1,
                label: '本科'
            }
        ];

        return (
            <div className="container-inner">
                {/* nav */}
                <Header title="申请资料填写" linkTo="" headCls="header"/>
                {/* 内页banner */}
                <InsidePageBanner imgUrl={ imgUrl } alt=""/>


                {/* test */}
                <WingBlank size="lg">
                    <WhiteSpace size="lg"/>
                    <Card>
                        <Card.Header title="融资需求登记" />
                        <Card.Body>
                            <div>
                                {/* <Test/> */}
                                <List renderHeader={() => 'RadioItem 演示'}>
                                    {data.map(i => (
                                        <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
                                            {i.label}
                                        </RadioItem>
                                    ))}
                                </List>
                            </div>
                        </Card.Body>
                    </Card>
                    <WhiteSpace size="lg" />
                </WingBlank>


                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
}
