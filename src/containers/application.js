/*
// 申请表单
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Header, Footer, InsidePageBanner, AppliForm } from 'components'

import { Button, List, Radio, InputItem } from 'antd-mobile'

import { createForm } from 'rc-form';

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

        //表单属性
        const { getFieldProps } = this.props.form;

        //表单单选项参数设置
        const { value } = this.state;
        const data = [
            {
                value: 0,
                label: '应收账款融资'
            },
            {
                value: 1,
                label: '订单融资'
            }
        ];

        return (
            <div className="container-inner">
                {/* nav */}
                <Header title="融资需求申请资料填写" linkTo="" headCls="header"/>
                {/* 内页banner */}
                <InsidePageBanner imgUrl={ imgUrl } alt=""/>

                {/* 表单 */}
                <List renderHeader={() => '请选择融资类型'} className="customs-form-components no-border-bottom">
                    {data.map(i => (
                        <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
                            {i.label}
                        </RadioItem>
                    ))}
                </List>

                <List>
                    <InputItem defaultValue="非受控模式" data-seed="logId" autoFocus>非受控</InputItem>
                    <InputItem {...getFieldProps('control')} placeholder="设置value,不设置defaultValue">受控<span style={{ color: 'red' }}>*</span></InputItem>
                    <InputItem {...getFieldProps('inputclear')} clear placeholder="提供清除文字功能" >显示清除按钮</InputItem>
                    <InputItem {...getFieldProps('input7', { initialValue: '校验出错', })} error onErrorClick={() => { alert('点击报错'); }}>报错样式</InputItem>
                    <InputItem {...getFieldProps('input3')} placeholder="无 label"/>
                    <InputItem {...getFieldProps('inputtitle2')} placeholder="标题可自定义">
                        <div style={{ backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/zumwvwrngNMGSWe.png)', backgroundSize: 'cover', height: '0.44rem', width: '0.44rem' }} />
                    </InputItem>
                    <InputItem {...getFieldProps('label8')} placeholder="限制标题显示的长度" labelNumber={3} >标题过长</InputItem>
                    <InputItem {...getFieldProps('preice')} placeholder="0.00" extra="元">价格</InputItem>
                    <InputItem {...getFieldProps('upload')} extra={<img src="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" />}>上传照片</InputItem>
                    <InputItem {...getFieldProps('bankCard', { initialValue: '8888 8888 8888 8888', })} type="bankCard">银行卡</InputItem>
                    <InputItem {...getFieldProps('phone')} type="phone" placeholder="186 1234 1234" >手机号码</InputItem>
                    <InputItem {...getFieldProps('password')} type="password" placeholder="****">密码</InputItem>
                    <InputItem {...getFieldProps('number')} type="number" placeholder="点击会弹出数字键盘">数字键盘</InputItem>
                    <InputItem value="不可编辑" editable={false}>姓名</InputItem>
                    <InputItem value="这个是禁用状态的样式" disabled>姓名</InputItem>
                </List>

                {/* <AppliForm/> */}

                <div className="appli-form-btn-box">
                    <Button className="btn" type="primary" htmlType="submit" onClick={e => console.log('点击')}>立即登记</Button>
                </div>

                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
};

Application = createForm()(Application);
