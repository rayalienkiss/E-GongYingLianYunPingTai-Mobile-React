/*
// 融资申请表单
// --------------------------------------------------
*/

import React, {
    Component
} from 'react'

import {
    Button,
    List,
    Radio,
    Picker,
    InputItem,
    Icon,
    Checkbox,
    Flex,
    Toast
} from 'antd-mobile'

import {
    createForm
} from 'rc-form'

// ajax
import axios from 'axios'

const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

//helpers
import {
    ruleType,
    tools
} from 'helpers';

class AppliForm extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            addDisabled: false,
            isMore: false, //  可选择的核身企业是否点击了更多
            data: {
                smsDisabled: false,
                smsContext: '获取验证码',
                isLogin: false,
                agreeChecked: false,
                financeType: [1],
                identity: [1],
                identitiesArr: [],
                coreEnterprisesArr: [],
                financeTypesArr: [],
                companyContext: [], //  对应核心企业的文案
            }
        };
    }

    componentDidMount() {
        this.loadData();
        this.getIsLogin();
    }

    componentWillUnmount() {
        let me = this;
        if (me.timer) {
            clearInterval(me.timer);
        }
    }

    //  判断是否登录
    getIsLogin() {
        let me = this;

        axios.get('/API/token').then(res => {
            // console.log(res);
            if (res.data.code == 200) {
                //  已登录
                let data = me.state.data;
                data.isLogin = true;
                me.getUserInfo();
                me.setState({
                    data
                });
            }
        });
    }

    //  如果已经登录获取用户信息
    getUserInfo() {
        let me = this;

        axios.get('/API/user/info').then(res => {
            if (res.data.code == 200) {
                let fieldsValues = {
                    userName: res.data.data.name,
                    userPhone: res.data.data.phone
                }
                me.props.form.setFieldsValue(fieldsValues);
            }
        });

    }

    loadData() {
        let me = this;
        let data = me.state.data;
        let urlArr = [
            axios.get('/API/supplyChain/identities'), //推荐人身份列表
            axios.get('/API/supplyChain/coreEnterprises'), //核心企业列表
            axios.get('/API/supplyChain/financeTypes') //融资类型列表
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
        let companyContext = data.companyContext;
        const {
            form
        } = this.props;
        // can use data-binding to get
        let num = form.getFieldValue('num');

        let addDisabled = false;

        companyContext.splice(k, 1);
        // console.log(companyContext);
        me.setState({
            addDisabled,
            data
        });

        num = num.filter((val, key) => {
            return key !== k;
        });
        // can use data-binding to set
        form.setFieldsValue({
            num,
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
    selectCompany(index) {
        let me = this;
        let data = me.state.data;
        let coreEnterprisesArr = data.coreEnterprisesArr;
        let companyContext = data.companyContext;
        const {
            form
        } = this.props;
        let num = form.getFieldValue('num');

        let isHasEmpty = false;
        let emptyIndex = null;
        companyContext.map((item, index) => {
            if (!item.trim()) {
                isHasEmpty = true;
                emptyIndex = index;
                return false;
            }
        });
        if (companyContext.length == num.length && !isHasEmpty) {
            // console.log("==");
            return false;
        } else {
            let value = coreEnterprisesArr[index].fullName;
            if (isHasEmpty) {
                companyContext[emptyIndex] = value;
            } else {
                companyContext.push(value);
            }

            me.setState({
                data
            });
        }
    }

    //  更多可选择的核身企业
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
        me.props.form.validateFields(['userPhone'], (errors, data) => {
            if (errors) {
                me.showError(errors);
                return false;
            }
            console.log("passed");
            // 推荐人手机验证通过TODO
            console.log(data);
            const url = tools.urlAddParam('/API/sms/send', {
                phone: data.userPhone,
                type: 1
            });
            axios.post(url).then(res => {
                if (res.data && res.data.code == 200) {
                    //  短信发送成功TODO
                    me.smsCodeTimerStart();
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

            axios.post('/API/supplyChain/apply', submitData).then(res => {
                if (res.data && res.data.code == 200) {
                    //  立即登记成功TODO
                    console.log('立即登记成功TODO');
                }
            });
        });
    }

    _getSubmitData(data) {
        let companyContext = this.state.data.companyContext;
        let submitData = Object.assign({}, data);
        //  数据处理TODO
        //  对应核心企业数据处理
        let coreEnterprises = companyContext.filter((val, key) => {
            return !!val.trim() != false;
        });
        let isIllegal = true;
        coreEnterprises.map((val, key) => {
            if (!!val) {
                isIllegal = false;
                return false;
            }
        });

        //  融资类型和推荐人身份处理
        submitData.financeType = submitData.financeType[0];
        submitData.identity = submitData.identity[0];

        if (isIllegal) {
            //  对应核心企业没有填写TODO
            submitData["coreEnterprises"] = false;
        } else {
            //  对应核心企业已填写TODO
            submitData["coreEnterprises"] = coreEnterprises;
        }

        // console.log(coreEnterprises);
        delete submitData['num'];
        delete submitData['agree'];
        return submitData;
    }

    render() {
        let me = this;
        let data = me.state.data;

        const {
            getFieldProps,
            getFieldValue
        } = me.props.form; //表单属性

        //fieldProps
        const fieldProps = {
            financeType: {
                initialValue: data.financeType,
                onChange: me.onFinanceTypeChange.bind(this)
            },
            coreEnterprises: {},
            financeEnterprise: {
                rules: [{
                    required: true,
                    message: '融资企业名称不能为空'
                }]
            },
            amount: {
                rules: [{
                        required: true,
                        message: '金额不能为空'
                    },
                    ruleType('number')
                ]
            },
            contactsName: {
                rules: [{
                    required: true,
                    message: '联系人姓名不能为空'
                }]
            },
            contactsPhone: {
                rules: [{
                        required: true,
                        message: '联系电话不能为空'
                    },
                    ruleType('mobile+fixedLine')
                ]
            },
            identity: {
                initialValue: data.identity,
                onChange: me.onIdentityChange.bind(me)
            },
            userName: {
                rules: [{
                    required: true,
                    message: '推荐人名称不能为空'
                }]
            },
            userPhone: {
                rules: [{
                        required: true,
                        message: '推荐人手机号码不能为空'
                    },
                    ruleType('mobile')
                ]
            },
            agree: {
                checked: data.agreeChecked,
                onChange: me.onAgreeChange.bind(me)
            },
            SMScode: {
                rules: [{
                    required: true,
                    message: '验证码不能为空'
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
            const value = me.state.data.companyContext[index] ? me.state.data.companyContext[index] : "";
            return (
                <InputItem
                    clear
                    labelNumber={6}
                    className="input-extra-for-btn"
                    key={index}
                    value={ value }
                    onChange={ (e) => { me.onCompanyChange.bind(this)(e,index) } }
                    extra={<Button icon={icon} type={ type } inline size="small" onClick={() => {onClick(index)}} disabled={disabled}></Button>}
                >
                    对应核心企业
                </InputItem>
            );
        });

        const companyItems = data.coreEnterprisesArr.map((item, index) => {
            if (index > 3 && !me.state.isMore) { //  超过四个不展示
                return false;
            }
            return (
                <a href="javeScript:void(0)" key={ index } style={ { marginRight : 5 } } onClick={ () => { me.selectCompany.bind(me)(index) } }>{ item.name }</a>
            );
        });

        const moreText = me.state.isMore ? "收起<<" : "更多>>";

        const moreBtn = data.coreEnterprisesArr.length > 3 ? <Button type="primary" onClick={ me.more.bind(this) } inline size="small" >{ moreText }</Button> : "";

        return (
            <form>
                {/* 选择融资类型 */}

                {/* 融资企业信息 */}
                <List renderHeader={() => <h3>融资企业信息</h3>} className="customs-form-components no-border-bottom form-box-in-1">
                    <Picker {...getFieldProps('financeType',fieldProps['financeType'])} data={data.financeTypesArr} cols={1} className="forss">
                      <List.Item arrow="horizontal">选择融资类型</List.Item>
                    </Picker>
                    { inputItems }
                    <List.Item wrap={true} multipleLine={ true }>
                        可选企业
                        <List.Item.Brief style={ { whiteSpace : 'normal' } }>{ companyItems }{ moreBtn }</List.Item.Brief>
                    </List.Item>
                    <InputItem {...getFieldProps('financeEnterprise',fieldProps['financeEnterprise'])} clear placeholder="请输入您的企业名称" labelNumber={6}>融资企业</InputItem>
                    <InputItem {...getFieldProps('amount',fieldProps['amount'])} clear extra="万元" labelNumber={6}>{ data.financeType[0] == 1 ? '存量应收账款' : '应付订单总额' }</InputItem>
                    <InputItem {...getFieldProps('contactsName',fieldProps['contactsName'])} clear labelNumber={6} placeholder="联系人姓名">企业联系人</InputItem>
                    <InputItem {...getFieldProps('contactsPhone',fieldProps['contactsPhone'])} clear labelNumber={6}  placeholder="手机号码">联系电话</InputItem>
                </List>

                {/* 推荐人信息 */}
                <List renderHeader={() => <div><h3>推荐人信息</h3><p>填写您的信息以便我们沟通合作</p></div>} className="customs-form-components no-border-bottom form-box-in-2">
                    <Picker {...getFieldProps('identity',fieldProps['identity'])} data={data.identitiesArr} cols={1} className="forss">
                      <List.Item arrow="horizontal">推荐人身份</List.Item>
                    </Picker>
                    <InputItem {...getFieldProps('userName',fieldProps['userName'])} clear labelNumber={5} placeholder="推荐人真实姓名" disabled={ data.isLogin }>真实姓名</InputItem>
                    <InputItem {...getFieldProps('userPhone',fieldProps['userPhone'])} clear labelNumber={5} placeholder="推荐人手机号码" disabled={ data.isLogin }>手机号码</InputItem>
                    {
                        data.isLogin ? "" :
                        <InputItem
                            {...getFieldProps('SMScode',fieldProps['SMScode'])}
                            clear labelNumber={5}
                            className="input-extra-for-btn"
                            extra={<Button type="primary" onClick={ me.smsSend.bind(me) } inline size="small" disabled={ data.smsDisabled }>{ data.smsContext }</Button>}>
                            验证码
                        </InputItem>
                    }
                </List>

                {/* 协议信息 */}
                <Flex>
                    <Flex.Item>
                      <AgreeItem data-seed="logId" {...getFieldProps('agree',fieldProps['agree'])}>
                        已阅读并同意<a href="javaScript:void(0);">《用户须知》</a>
                      </AgreeItem>
                    </Flex.Item>
                </Flex>

                {/* 表单提交 */}
                <div className="appli-form-btn-box">
                    <Button className="btn" type="primary" htmlType="submit" disabled={ !data.agreeChecked } onClick={ me.submit.bind(this) }>立即登记</Button>
                </div>
            </form>
        )
    }
}

export default createForm()(AppliForm)