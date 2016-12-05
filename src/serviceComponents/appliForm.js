/*
// 融资申请表单
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Button, List, Radio, InputItem, Pick } from 'antd-mobile'

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
                <List renderHeader={() => <h3>选择融资类型</h3>} className="customs-form-components no-border-bottom">
                    {data.map(i => (
                        <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
                            {i.label}
                        </RadioItem>
                    ))}
                </List>

                {/* 融资企业信息 */}
                <List renderHeader={() => <h3>融资企业信息</h3>} className="customs-form-components no-border-bottom">
                    <InputItem {...getFieldProps('yourCompany')} clear placeholder="请输入您的企业名称" labelNumber={6}>融资企业</InputItem>
                    <InputItem {...getFieldProps('total')} clear extra="万元" labelNumber=''>{ totalLabel }</InputItem>
                    <InputItem {...getFieldProps('contacts')} clear labelNumber={6}>企业联系人</InputItem>
                    <InputItem {...getFieldProps('phone')} clear type="phone" labelNumber={6}>联系电话</InputItem>
                </List>

                {/* 推荐人信息 */}
                <List renderHeader={() => <div><h3>推荐人信息</h3><p>填写您的信息以便我们沟通合作</p></div>} className="customs-form-components no-border-bottom">
                    <select>
                        <option></option>
                    </select>
                    <InputItem {...getFieldProps('yourCompany')} clear labelNumber={6}>真实姓名</InputItem>
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
