/*
// 登录表单
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Button, List, InputItem, Icon, Flex, Toast } from 'antd-mobile'

import { createForm } from 'rc-form'

import store from 'store';

// ajax
import axios from 'axios'

import './appli-fill.less';

//helpers
import { ruleType, tools } from 'helpers';

class LoginForm extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    constructor( props ) {
        super( props );
        this.state = {
            data: {
                smsDisabled: false,
                smsContext: '获取验证码',
            },
        };
        this.smsIsSending = false;
    };

    // 验证码发送
    smsSend() {

        let me = this;

        if ( me.smsIsSending ) {
            return false;
        };

        me.smsIsSending = true;

        me.props.form.validateFields(['userPhone'], (errors, data) => {
            if (errors) {
                //me.showError( errors );
                me.smsIsSending = false;
                return false;
            }
            console.log("passed");
            // 推荐人手机验证通过TODO
            console.log( data );
            const url = tools.urlAddParam('/api/sms/send', {
                phone: data.userPhone,
                type: 1
            });
            axios.get(url).then(res => {
                me.smsIsSending = false;
                if (res.data && res.data.code == 200) {
                    //  短信发送成功TODO
                    me.smsCodeTimerStart();
                } else {
                    Toast.fail(res.data.message, 1.5);
                }
            })
        });
    };

    // 点击登录按钮时，如表单验证有误，需要显示最先的一条错误
    // showError( errors ) {
    //     let message = "";
    //     for (let prop in errors) {
    //         if (errors[prop] && errors[prop].errors && errors[prop].errors[0] && errors[prop].errors[0].message) {
    //             message = errors[prop].errors[0].message;
    //             break;
    //         }
    //     }
    //     Toast.fail( message, 2 );
    // };

    // 验证码倒计时交互
    smsCodeTimerStart() {

        let me = this;

        let data = me.state.data;

        let time = 60000;

        const SEC = 1000;

        const SUFFIX = '秒后可重新发送';

        data.smsDisabled = true;

        data.smsContext = time / SEC + SUFFIX;

        me.setState({
            data
        });

        me.timer = setInterval(() => {
            time -= SEC;
            let seconds = time / SEC;
            data.smsDisabled = seconds == 0 ? false : true;
            data.smsContext = seconds == 0 ? '获取验证码' : seconds + SUFFIX;
            if (seconds == 0) {
                clearInterval(me.timer);
            }
            me.setState({
                data
            });
        }, SEC);
    };

    // 立即登录
    submit() {
        let me = this;
        me.props.form.validateFields( ( errors, data ) => {
            if ( errors ) {
                console.log( errors );
                return false;
            }
            // 验证通过TODO
            axios.get(
                '/api/login/login?phone='+ data.userPhone + "&SMScode=" + data.SMScode
            )
                .then(res => {

                if ( !res.data.user ) {
                    res.data.user = {};
                }

                switch ( res.data.code ) {
                    case 200:
                        // 200登录成功
                        store.set("payWeLoginData", res.data);
                        me.context.router.push(`UserCenter`);
                        break;

                    case 300:
                        Toast.fail( res.data.message );
                        break;

                    case 304:
                        Toast.fail(res.data.data[0].errorMsg);
                        break;

                    case 500:
                        Toast.fail('服务器正在开小差')
                        break;

                    default:
                }
            });
        });
    }

    componentDidMount() {
        //let me = this;
        //me.loginInfoInit();
        //me.loadData();
    };

    componentWillUnmount() {
        let me = this;
        if( me.timer ) {
            //组件准备卸载时，清除 timer 的 状态
            clearInterval( me.timer );
        };
    };

    render() {

        let me = this;
        let data = me.state.data;

        const { getFieldProps, getFieldValue, getFieldError, } = me.props.form;

        const fieldProps = {
            userPhone: {
                validateTrigger: 'onBlur',
                rules: [
                    {
                        required: true,
                        message: '推荐人手机号码不能为空'
                    }, {
                        pattern: /^\S*$/,
                        message: '推荐人手机号码不支持输入空格'
                    },
                    ruleType('mobile')
                ]
            },
            SMScode: {
                validateTrigger: 'onBlur',
                rules: [
                    {
                        required: true,
                        message: '验证码不能为空'
                    }, {
                        pattern: /^\S*$/,
                        message: '验证码不支持输入空格'
                    }
                ]
            }
        };

        return (
            <div className="custom-form-wrap form-box-in-1" style={{ borderTop: 'none' }}>
                <form className="custom-form">
                    {/* 融资企业信息 */}
                    <List className="customs-form-components no-border-bottom">

                        {/* 手机号码 */}
                        <InputItem
                            { ...getFieldProps( 'userPhone',fieldProps[ 'userPhone' ] ) }
                            clear
                            error={ !!getFieldError( 'userPhone' ) }
                            onErrorClick={
                                () => {
                                    Toast.fail( getFieldError('userPhone'),2 );
                                }
                            }
                            labelNumber={ 0 }
                            placeholder="请输入您的手机号码"
                        />

                        {/* 验证码 */}
                        <InputItem
                            { ...getFieldProps( 'SMScode',fieldProps[ 'SMScode' ] ) }
                            clear
                            error={ !!getFieldError( 'SMScode' ) }
                            onErrorClick={
                                () => {
                                    Toast.fail( getFieldError( 'SMScode' ),2 );
                                }
                            }
                            labelNumber={ 0 }
                            className="input-extra-for-btn"
                            type="number"
                            placeholder="请输入验证码"
                            extra={
                                <Button
                                    type="primary"
                                    inline
                                    size="small"
                                    onClick={ me.smsSend.bind( me ) }
                                    disabled={ data.smsDisabled }
                                >
                                    { data.smsContext }
                                </Button>
                            }
                        />

                    </List>

                    {/* 表单提交 */}
                    <div className="appli-form-btn-box" style={{ paddingTop: 0 }}>
                        <Button className="btn" type="primary" onClick={ me.submit.bind(this) }>立即登录</Button>
                        {/* <Button className="btn" type="primary">立即登录</Button> */}
                    </div>

                </form>
            </div>
        )
    }
}

export default createForm()(LoginForm);
