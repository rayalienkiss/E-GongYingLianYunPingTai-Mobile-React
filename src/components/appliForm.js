/*
// 申请表单
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { List, InputItem } from 'antd-mobile'

import { createForm } from 'rc-form'

// let AppliForm = React.createClass({
//
//   render() {
//
//     const { getFieldProps } = this.props.form;
//
//     return (
//         <List>
//             <InputItem defaultValue="非受控模式" data-seed="logId" autoFocus>非受控</InputItem>
//             <InputItem {...getFieldProps('control')} placeholder="设置value,不设置defaultValue">受控<span style={{ color: 'red' }}>*</span></InputItem>
//             <InputItem {...getFieldProps('inputclear')} clear placeholder="提供清除文字功能" >显示清除按钮</InputItem>
//             <InputItem {...getFieldProps('input7', { initialValue: '校验出错', })} error onErrorClick={() => { alert('点击报错'); }}>报错样式</InputItem>
//             <InputItem {...getFieldProps('input3')} placeholder="无 label"/>
//             <InputItem {...getFieldProps('inputtitle2')} placeholder="标题可自定义">
//                 <div style={{ backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/zumwvwrngNMGSWe.png)', backgroundSize: 'cover', height: '0.44rem', width: '0.44rem' }} />
//             </InputItem>
//             <InputItem {...getFieldProps('label8')} placeholder="限制标题显示的长度" labelNumber={3} >标题过长</InputItem>
//             <InputItem {...getFieldProps('preice')} placeholder="0.00" extra="元">价格</InputItem>
//             <InputItem {...getFieldProps('upload')} extra={<img src="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" />}>上传照片</InputItem>
//             <InputItem {...getFieldProps('bankCard', { initialValue: '8888 8888 8888 8888', })} type="bankCard">银行卡</InputItem>
//             <InputItem {...getFieldProps('phone')} type="phone" placeholder="186 1234 1234" >手机号码</InputItem>
//             <InputItem {...getFieldProps('password')} type="password" placeholder="****">密码</InputItem>
//             <InputItem {...getFieldProps('number')} type="number" placeholder="点击会弹出数字键盘">数字键盘</InputItem>
//             <InputItem value="不可编辑" editable={false}>姓名</InputItem>
//             <InputItem value="这个是禁用状态的样式" disabled>姓名</InputItem>
//         </List>);
//   },
// });

export default class AppliForm extends Component {

    render() {

        const { getFieldProps } = this.props.form;

        return (
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
        )
    }
}

AppliForm = createForm()(AppliForm);
