/*
// 融资申请表单
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Button, List, Radio, Picker, InputItem, Icon, Checkbox, Flex, Toast } from 'antd-mobile'

import { createForm } from 'rc-form'

import store from 'store';

// ajax
import axios from 'axios'

import './appli-fill.less';

const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

//helpers
import { ruleType, tools } from 'helpers';

class AppliForm extends React.Component {

        static contextTypes = {
            router: React.PropTypes.object.isRequired
        }

        constructor(props) {
            super(props);
            this.state = {
                addDisabled: false,
                isMore: false, //  可选择的核心企业是否点击了更多
                data: {
                    smsDisabled: false,
                    smsContext: '获取验证码',
                    agreeChecked: false,
                    financeType: [1],
                    identity: [1],
                    identitiesArr: [],
                    coreEnterprisesArr: [],
                    financeTypesArr: [],
                    companyContext: [], //  对应核心企业的文案
                    isLogin: false
                }
            };

            this.smsIsSending = false;
        }

        componentDidMount() {
            this.loadData();
            this.loginInfoInit();
        }

        componentWillUnmount() {
            let me = this;
            if (me.timer) {
                clearInterval(me.timer);
            }
        }

        //  页面登录信息初始化
        loginInfoInit() {
            let me = this;
            let data = me.state.data;

            let payWeLoginData = store.get('payWeLoginData');

            if (!payWeLoginData) {
                return false;
            }

            //console.log(payWeLoginData);

            let fieldsValues = {
                userName: payWeLoginData.data.user.name,
                userPhone: payWeLoginData.data.user.phone
            }

            //console.log(fieldsValues,'fieldsValues');

            me.props.form.setFieldsValue(fieldsValues);

            data.isLogin = true;
            me.setState({
                data
            })
        }

        loadData() {
            let me = this;
            let data = me.state.data;
            let urlArr = [
                axios.get('/api/supplyChain/identities'), //推荐人身份列表
                axios.get('/api/supplyChain/coreEnterprises'), //核心企业列表
                axios.get('/api/supplyChain/financeTypes') //融资类型列表
            ];
            axios.all(urlArr).then(axios.spread(function(identities, coreEnterprises, financeTypes) {
                // console.log(identities, coreEnterprises, financeTypes);
                data.identitiesArr = me.dataTransfer(identities.data.data, 'id', 'name');
                data.coreEnterprisesArr = coreEnterprises.data.data;
                data.financeTypesArr = me.dataTransfer(financeTypes.data.data, 'id', 'name');
                // console.log(data.financeTypesArr);
                me.setState({
                    data
                });
            }));
        }

        dataTransfer(arr, valueName, labelName) {
            let transArr = [];
            arr.map((val, key) => {
                let obj = {
                    value: val[valueName],
                    label: val[labelName],
                }
                transArr.push(obj);
            });

            return transArr;
        }

        onFinanceTypeChange(value) {
            let me = this;
            let data = me.state.data;
            if (data.financeType == value) {
                return false;
            }
            data.financeType = value;
            me.setState({
                data
            });
        }

        onIdentityChange(value) {
            let data = this.state.data;
            if (data.identity == value) {
                return false;
            }
            data.identity = value;
            this.setState({
                data
            });
        }

        add() {
            // console.log("add");
            let me = this;
            const {
                form
            } = me.props;
            // can use data-binding to get
            let num = form.getFieldValue('num');
            num = num.concat(num[num.length - 1] + 1);

            if (num.length == 10) { //  对应核心企业最多为十个
                let addDisabled = true;
                me.setState({
                    addDisabled
                });
            }

            // // can use data-binding to set
            // // important! notify form to detect changes
            form.setFieldsValue({
                num,
            });
        }

        remove(k) {
            let me = this;
            let data = me.state.data;
            const {
                form
            } = this.props;
            // can use data-binding to get
            let num = form.getFieldValue('num');

            let addDisabled = false;

            for (let i = 0; i < num.length; i++) {
                if (i >= k) {
                    let value = (i < num.length - 1) ? form.getFieldValue(`coreEnterprises${i + 1}`) : undefined;
                    form.setFieldsValue({
                        [`coreEnterprises${i}`]: value
                    });
                }
            }

            num = num.filter((val, key) => {
                return key !== k;
            });
            // can use data-binding to set
            form.setFieldsValue({
                num,
            });
            me.setState({
                addDisabled
            });
        }

        onCompanyChange(value, index) {
            let me = this;
            console.log(index);
            let data = me.state.data;
            let companyContext = data.companyContext;
            companyContext[index] = value;
            me.setState({
                data
            });
        }

        //  点可选的核身企业交互
        selectCompany(e, index) {
            e.preventDefault();
            // console.log(index);
            let me = this;
            let data = me.state.data;
            let coreEnterprisesArr = data.coreEnterprisesArr;
            const {
                form
            } = this.props;
            let num = form.getFieldValue('num');

            let isHasEmpty = false;
            let emptyIndex = null;
            for (let i = 0; i < num.length; i++) {
                let formValue = form.getFieldValue(`coreEnterprises${i}`);
                if (!formValue || !formValue.trim()) {
                    isHasEmpty = true;
                    emptyIndex = i;
                    break;
                }
            }
            if (!isHasEmpty) {
                // console.log("==");
                return false;
            } else {
                let value = coreEnterprisesArr[index].fullName;
                form.setFieldsValue({
                    [`coreEnterprises${emptyIndex}`]: value
                });
            }
        }

        //  更多可选择的核心企业
        more() {
            let me = this;
            let isMore = !me.state.isMore;
            me.setState({
                isMore
            });
        }

        onAgreeChange(e) {
            let me = this;
            let data = me.state.data;
            data.agreeChecked = e.target.checked;
            me.setState({
                data
            });
        }

        //  验证码发送
        smsSend() {
            let me = this;
            if (me.smsIsSending) {
                return false;
            }
            me.smsIsSending = true;
            me.props.form.validateFields(['userPhone'], (errors, data) => {
                if (errors) {
                    me.showError(errors);
                    me.smsIsSending = false;
                    return false;
                }
                console.log("passed");
                // 推荐人手机验证通过TODO
                console.log(data);
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
        }

        showError(errors) {
            console.log(errors);
            let message = "表单校验错误";
            for (let prop in errors) {
                if (errors[prop] && errors[prop].errors && errors[prop].errors[0] && errors[prop].errors[0].message) {
                    message = errors[prop].errors[0].message;
                    break;
                }
            }
            Toast.fail(message, 1.5);
        }

        //  验证码倒计时交互
        smsCodeTimerStart() {
            let me = this;
            let data = me.state.data;

            let time = 60000;
            // let time = 3000;
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

        }

        //  提交（立即登记）
        submit() {
            let me = this;
            me.props.form.validateFields((errors, data) => {
                if (errors) {
                    me.showError(errors);
                    return false;
                }
                console.log("passed");
                // console.log(data);
                // 验证通过TODO
                let submitData = me._getSubmitData(data);
                console.log(submitData);
                if (!submitData["coreEnterprises"]) {
                    //  对应核心企业没有填写TODO
                    Toast.fail('请至少填写一个对应核心企业', 1.5);
                    return false;
                }

                axios.post('/api/supplyChain/apply', submitData).then(res => {
                    switch (res.data.code) {
                        case 200:
                            //  立即登记成功TODO
                            // console.log('立即登记成功TODO');
                            // store.set('payWeIsLogin', true);
                            me.context.router.push(`ApplicationCommitted`);
                            break;

                        case 300:
                            Toast.fail(res.data.message);
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

        _getSubmitData(data) {
            let me = this;
            let submitData = Object.assign({}, data);
            // console.log(submitData);
            //  数据处理TODO
            //  对应核心企业数据处理
            let num = submitData['num'];
            let coreEnterprises = [];
            for (let i = 0; i < num.length; i++) {
                let coreEnterpriseVal = submitData[`coreEnterprises${i}`];
                if (!!coreEnterpriseVal || (typeof coreEnterpriseVal == 'string' && !!coreEnterpriseVal.trim())) {
                    coreEnterprises.push(coreEnterpriseVal);
                }
                delete submitData[`coreEnterprises${i}`];
            }

            submitData["coreEnterprises"] = !!coreEnterprises.length ? coreEnterprises : false;

            //融资类型和推荐人身份处理
            submitData['financeType'] = submitData['financeType'][0];
            submitData['identity'] = submitData['identity'][0];

            //  邀请码处理
            if (me.props.location.query.linkCode) {
                submitData["linkCode"] = me.props.location.query.linkCode;
            }

            //  是否登录处理
            submitData['isLogin'] = me.state.data.isLogin ? 1 : 0;

            // console.log(coreEnterprises);
            delete submitData['num'];
            delete submitData['agree'];
            return submitData;
        }

        loginOut() {
            let me = this;
            axios.get('/api/login/logout').then(res => {
                switch (res.data.code) {
                    case 200:
                        //  退出登录成功TODO
                        console.log('退出登录成功TODO');
                        store.remove("payWeLoginData");
                        let data = me.state.data
                        data.isLogin = false
                        me.setState({
                            data
                        })
                        let fieldsValues = {
                            userName: '',
                            userPhone: '',
                        }
                        me.props.form.setFieldsValue(fieldsValues);
                        // location.reload();
                        // me.context.router.push(`Home`);
                        break;

                    case 300:
                        Toast.fail(res.data.data.message);
                        break;

                    case 500:
                        Toast.fail('服务器正在开小差')
                        break;

                    default:
                }
            });
        }

        render() {
                let me = this;
                let data = me.state.data;

                const {
                    getFieldProps,
                    getFieldValue,
                    getFieldError,
                } = me.props.form; //表单属性
                // console.log(getFieldError);
                //fieldProps
                const fieldProps = {
                    financeType: {
                        initialValue: data.financeType,
                        onChange: me.onFinanceTypeChange.bind(this)
                    },
                    coreEnterprises: {
                        validateTrigger: 'onBlur',
                        rules: [{
                            required: true,
                            message: '核心企业名称不能为空'
                        }, {
                            min: 2,
                            max: 50,
                            message: '对应核心企业长度必须为2-50个字符'
                        }, {
                            pattern: /^\S*$/,
                            message: '对应核心企业不支持输入空格',
                        }]
                    },
                    financeEnterprise: {
                        validateTrigger: 'onBlur',
                        rules: [{
                            required: true,
                            message: '融资企业名称不能为空'
                        }, {
                            pattern: /^\S*$/,
                            message: '融资企业名称不支持输入空格',
                        }, {
                            min: 2,
                            max: 50,
                            message: '融资企业名称长度必须为2-50个字符'
                        }]
                    },
                    amount: {
                        validateTrigger: 'onBlur',
                        rules: [{
                                required: true,
                                message: '金额不能为空'
                            }, {
                                pattern: /^\S*$/,
                                message: '金额不支持输入空格',
                            }, {
                                validator: (rule, value, callback) => {
                                    // console.log(value)
                                    if (value * 1 <= 0) {
                                        callback('输入金额必须大于0');
                                    } else {
                                        callback();
                                    }
                                }
                            }, {
                                pattern: /^\d+$/,
                                message: '输入金额只能是整数',
                            }, {
                                max: 13,
                                message: '金额最长为13个字符'
                            }
                        ]
                    },
                    contactsName: {
                        validateTrigger: 'onBlur',
                        rules: [{
                            required: true,
                            message: '联系人姓名不能为空'
                        }, {
                            pattern: /^\S*$/,
                            message: '联系人姓名不支持输入空格',
                        }, {
                            min: 1,
                            max: 15,
                            message: '联系人姓名长度必须为1-15个字符'
                        }]
                    },
                    contactsPhone: {
                        validateTrigger: 'onBlur',
                        rules: [{
                                required: true,
                                message: '联系电话不能为空'
                            }, {
                                pattern: /^\S*$/,
                                message: '联系电话不支持输入空格',
                            },
                            ruleType('mobile+fixedLine')
                        ]
                    },
                    identity: {
                        initialValue: data.identity,
                        onChange: me.onIdentityChange.bind(me)
                    },
                    userName: {
                        validateTrigger: 'onBlur',
                        rules: [{
                            required: true,
                            message: '推荐人名称不能为空'
                        }, {
                            pattern: /^\S*$/,
                            message: '推荐人名称不支持输入空格',
                        }, {
                            min: 1,
                            max: 15,
                            message: '推荐人名称长度必须为1-15个字符'
                        }]
                    },
                    userPhone: {
                        validateTrigger: 'onBlur',
                        rules: [{
                                required: true,
                                message: '推荐人手机号码不能为空'
                            }, {
                                pattern: /^\S*$/,
                                message: '推荐人手机号码不支持输入空格',
                            },
                            ruleType('mobile')
                        ]
                    },
                    agree: {
                        checked: data.agreeChecked,
                        onChange: me.onAgreeChange.bind(me)
                    },
                    SMScode: {
                        validateTrigger: 'onBlur',
                        rules: [{
                            required: true,
                            message: '验证码不能为空'
                        }, {
                            pattern: /^\S*$/,
                            message: '验证码不支持输入空格',
                        }]
                    }
                }

                getFieldProps('num', {
                    initialValue: [1],
                });

                const inputItems = getFieldValue('num').map((val, index) => {
                    const icon = index == 0 ? "plus" : "cross";
                    const type = index == 0 ? "primary" : "ghost";
                    const onClick = index == 0 ? me.add.bind(me) : me.remove.bind(me);
                    const disabled = index == 0 && me.state.addDisabled ? true : false;
                    return (
                        <InputItem
                            clear
                            labelNumber={6.5}
                            className="input-extra-for-btn"
                            key={index}
                            {
                                ...getFieldProps(
                                    `coreEnterprises${index}`,
                                    fieldProps['coreEnterprises']
                                )
                            }
                            error={
                                !!getFieldError(
                                    `coreEnterprises${index}`
                                )
                            }
                            onErrorClick={
                                () => {
                                    Toast.fail( getFieldError(`coreEnterprises${index}`),2 );
                                }
                            }
                            extra={
                                <Button
                                    icon={
                                        icon
                                    }
                                    type={
                                        type
                                    }
                                    inline
                                    size="small"
                                    onClick={
                                        () => {
                                            onClick(index)
                                        }
                                    }
                                    disabled={
                                        disabled
                                    }
                                />
                            }
                            placeholder="请输入核心企业名称"
                        />
                    );
                });

        const companyItems = data.coreEnterprisesArr.map((item, index) => {
            if (index > 3 && !me.state.isMore) { //  超过四个不展示
                return false;
            }
            return (
                <a key={ index } style={ { marginRight : 5, color: "rgb(68,146,212)" } } onClick={ (e) => { me.selectCompany.bind(me)(e,index) } }>{ item.name }</a>
            );
        });

        const moreText = me.state.isMore ? "收起<<" : "更多>>";

        const moreBtn = data.coreEnterprisesArr.length > 3 ? <span style={{ color: "#333" }} onClick={ me.more.bind(this) }>{ moreText }</span> : "";

        return (
            <div className="custom-form-wrap form-box-in-1">
                <form className="custom-form">

                    {/* 融资企业信息 */}
                    <List
                        renderHeader={
                            () => (
                                <h3><
                                    Icon type="edit"/>&nbsp;&nbsp;融资企业信息
                                </h3>
                            )
                        }
                        className="customs-form-components no-border-bottom"
                    >

                        {/* 选择融资类型 */}
                        <div className="label-fake">选择融资类型</div>
                        <Picker
                            {
                                ...getFieldProps(
                                    'financeType',
                                    fieldProps['financeType']
                                )
                            }
                            data={
                                data.financeTypesArr
                            }
                            cols={
                                1
                            }
                            className="forss"
                        >
                          <List.Item arrow="horizontal"/>
                        </Picker>

                        {/* 对应核心企业 */}
                        <div className="label-fake">对应核心企业</div>
                        { inputItems }

                        {/* 可选择的核心企业： */}
                        <List.Item
                            wrap={
                                true
                            }
                            multipleLine={
                                true
                            }
                            style={{
                                border: 'none', marginTop: 0
                            }}
                        >
                            <List.Item.Brief
                                style={{
                                    whiteSpace : 'normal',
                                    lineHeight: 1.6
                                }}
                            >
                                <span>
                                    可选择的核心企业：&nbsp;
                                </span>
                                { companyItems }
                                { moreBtn }
                            </List.Item.Brief>
                        </List.Item>

                        {/* 融资企业 */}
                        <div className="label-fake">融资企业</div>
                        <InputItem
                            {
                                ...getFieldProps(
                                    'financeEnterprise',
                                    fieldProps['financeEnterprise']
                                )
                            }
                            clear
                            placeholder="请输入您的企业名称"
                            error={
                                !!getFieldError('financeEnterprise')
                            }
                            onErrorClick={
                                () => {
                                    Toast.fail( getFieldError('financeEnterprise'),2 );
                                }
                            }
                            labelNumber={
                                1
                            }
                        />

                        {/* 存量应收账款 /  应付订单总额 */}
                        <div className="label-fake">
                            { data.financeType[0] == 1 ? '存量应收账款' : '应付订单总额' }
                        </div>
                        <InputItem
                            {
                                ...getFieldProps(
                                    'amount',
                                    fieldProps['amount']
                                )
                            }
                            clear
                            error={
                                !!getFieldError('amount')
                            }
                            extra="万元"
                            labelNumber={
                                1
                            }
                            onErrorClick={
                                () => {
                                    Toast.fail( getFieldError('amount'),2 );
                                }
                            }
                        />

                        {/* 企业联系人 */}
                        <div className="label-fake">企业联系人</div>
                        <InputItem
                            {
                                ...getFieldProps(
                                    'contactsName',
                                    fieldProps['contactsName']
                                )
                            }
                            clear
                            error={
                                !!getFieldError('contactsName')
                            }
                            labelNumber={
                                1
                            }
                            onErrorClick={
                                () => {
                                    Toast.fail( getFieldError('contactsName'),2 );
                                }
                            }
                            placeholder="联系人姓名"
                        />

                        {/* 联系电话 */}
                        <div className="label-fake">联系电话</div>
                        <InputItem
                                {
                                ...getFieldProps(
                                    'contactsPhone',
                                    fieldProps['contactsPhone']
                                )
                            }
                            clear
                            error={
                                !!getFieldError('contactsPhone')
                            }
                            onErrorClick={
                                () => {
                                    Toast.fail( getFieldError('contactsPhone'),2 );
                                }
                            }
                            labelNumber={
                                1
                            }
                            placeholder="手机号码"
                        />

                    </List>

                    {/* 推荐人信息 */}
                    <List
                        renderHeader={
                            () => (
                                <div>
                                    <h4
                                        style={{
                                            color: '#e15b2c'
                                        }}
                                    >
                                        推荐人信息
                                    </h4>
                                    <p>
                                        填写您的信息以便我们沟通合作
                                    </p>
                                </div>
                            )
                        }
                        className="customs-form-components no-border-bottom form-box-in-2"
                    >
                        {/* 推荐人身份 */}
                        <div className="label-fake">推荐人身份</div>
                        <Picker
                            {
                                ...getFieldProps(
                                    'identity',
                                    fieldProps['identity']
                                )
                            }
                            data={
                                data.identitiesArr
                            }
                            cols={
                                1
                            }
                            className="forss"
                            onErrorClick={
                                () => {
                                    Toast.fail( getFieldError('identity'),2 );
                                }
                            }
                        >
                          <List.Item arrow="horizontal"/>
                        </Picker>
                        <div className="iosDisabled">

                            {/* 真实姓名 */}
                            <div className="label-fake">真实姓名</div>
                            <InputItem
                                {
                                    ...getFieldProps(
                                        'userName',
                                        fieldProps['userName']
                                    )
                                }
                                clear
                                error={
                                    !!getFieldError('userName')
                                }
                                onErrorClick={
                                    () => {
                                        Toast.fail( getFieldError('userName'),2 );
                                    }
                                }
                                labelNumber={
                                    1
                                }
                                placeholder="推荐人真实姓名"
                                disabled={
                                    data.isLogin
                                }
                            />

                            {/* 手机号码 */}
                            <div className="label-fake">手机号码</div>
                            <InputItem
                                {
                                    ...getFieldProps(
                                        'userPhone',
                                        fieldProps['userPhone']
                                    )
                                }
                                clear
                                error={
                                    !!getFieldError('userPhone')
                                }
                                onErrorClick={
                                    () => {
                                        Toast.fail( getFieldError('userPhone'),2 );
                                    }
                                }
                                labelNumber={
                                    1
                                }
                                placeholder="推荐人手机号码"
                                disabled={
                                    data.isLogin
                                }
                            />

                        </div>
                        {
                            data.isLogin ? "" :
                            <div>

                                {/* 验证码 */}
                                <div className="label-fake">验证码</div>
                                <InputItem
                                    {
                                        ...getFieldProps(
                                            'SMScode',
                                            fieldProps['SMScode']
                                        )
                                    }
                                    error={
                                        !!getFieldError('SMScode')
                                    }
                                    onErrorClick={
                                        () => {
                                            Toast.fail( getFieldError('SMScode'),2 );
                                        }
                                    }
                                    clear
                                    labelNumber={
                                        5
                                    }
                                    className="input-extra-for-btn"
                                    type="number"
                                    placeholder="请输入验证码"
                                    extra={
                                        <Button
                                            type="primary"
                                            onClick={
                                                me.smsSend.bind(me)
                                            }
                                            inline
                                            size="small"
                                            disabled={
                                                data.smsDisabled
                                            }
                                        >
                                            { data.smsContext }
                                        </Button>
                                    }
                                />
                            </div>
                        }
                    </List>

                    {/* 协议信息 */}
                    <Flex>
                        <Flex.Item>
                          <AgreeItem
                              data-seed="logId" {
                                  ...getFieldProps(
                                      'agree',
                                      fieldProps['agree']
                                  )
                              }
                             >
                            已阅读并同意《<a href="/UserRight" target="_blank">用户须知</a>》
                          </AgreeItem>
                        </Flex.Item>
                    </Flex>

                    {/* 表单提交 */}
                    <div className="appli-form-btn-box">

                        <Button
                            className="btn"
                            type="primary"
                            disabled={
                                !data.agreeChecked
                            }
                            onClick={
                                me.submit.bind(this)
                            }
                        >
                            立即登记
                        </Button>

                        {/* 切换推荐人 */}
                        {
                            data.isLogin ? <Button className="btn" onClick={ me.loginOut.bind(me) } type="default" style={{ marginTop: 10 }}>切换推荐人</Button> : ""
                        }
                    </div>

                </form>
            </div>
        )
    }
}

export default createForm()(AppliForm)
