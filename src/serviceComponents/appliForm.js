/*
// 融资申请表单
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Button, List, Radio, InputItem, Icon } from 'antd-mobile'

import { createForm } from 'rc-form'

//定义 RadioItem
const RadioItem = Radio.RadioItem;

class AppliForm extends React.Component {

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

        const { getFieldProps } = this.props.form, //表单属性

              { value } = this.state, //表单单选项参数设置
              data = [
                  {
                      value: 1,
                      label: '应收账款融资'
                  },
                  {
                      value: 0,
                      label: '订单融资'
                  }
              ];

        //选择融资的类型决定 totalLabel 字段
        let totalLabel = '存量应收账款';

        return (
            <form>
                {/* 选择融资类型 */}
                <List renderHeader={() => <h3>选择融资类型</h3>} className="customs-form-components no-border-bottom form-box-in-1">
                    {data.map(i => (
                        <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
                            {i.label}
                        </RadioItem>
                    ))}
                </List>

                {/* 融资企业信息 */}
                <List renderHeader={() => <h3>融资企业信息</h3>} className="customs-form-components no-border-bottom form-box-in-2">
                    <InputItem
                        {...getFieldProps('identifying')}
                        clear labelNumber={6.5}
                        className="input-extra-for-btn"
                        extra={<Button className="btn" data-seed="getCode" type="primary" inline size="small" onClick={e => console.log(e)}><Icon type="plus" /></Button>}>
                        对应核心企业
                    </InputItem>
                    <InputItem {...getFieldProps('appliCompany')} clear placeholder="请输入您的企业名称" labelNumber={6}>融资企业</InputItem>
                    <InputItem {...getFieldProps('total')} clear extra="万元" labelNumber=''>{ totalLabel }</InputItem>
                    <InputItem {...getFieldProps('contacts')} clear labelNumber={6}>企业联系人</InputItem>
                    <InputItem {...getFieldProps('phone')} clear type="phone" labelNumber={6}>联系电话</InputItem>
                </List>

                {/* 推荐人信息 */}
                <List renderHeader={() => <div><h3>推荐人信息</h3><p>填写您的信息以便我们沟通合作</p></div>} className="customs-form-components no-border-bottom form-box-in-3">
                    <div className="am-list-item with-select">
                        <select>
                            <option disabled="">点击选择您的身份</option>
                            <option value="1">上下游企业经办人</option>
                            <option value="2">银行客户经理</option>
                            <option value="3">保险公司</option>
                            <option value="4">会计事务所</option>
                            <option value="5">产业/行业协会</option>
                            <option value="6">其他</option>
                        </select>
                    </div>
                    <InputItem {...getFieldProps('yourName')} clear labelNumber={5}>真实姓名</InputItem>
                    <InputItem {...getFieldProps('yourPhone')} clear labelNumber={5}>手机号码</InputItem>
                    <InputItem
                        {...getFieldProps('identifying')}
                        clear labelNumber={5}
                        className="input-extra-for-btn"
                        extra={<Button className="btn" data-seed="getCode" type="primary" inline size="small" onClick={e => console.log(e)}>获取验证码</Button>}>
                        验证码
                    </InputItem>
                </List>

                {/* 表单提交 */}
                <div className="appli-form-btn-box">
                    <Button className="btn" type="primary" htmlType="submit" onClick={e => console.log('点击')}>立即登记</Button>
                </div>
            </form>
        )
    }
}

export default createForm()(AppliForm)
