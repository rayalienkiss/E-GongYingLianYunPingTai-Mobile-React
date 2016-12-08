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
    Icon
} from 'antd-mobile'

import {
    createForm
} from 'rc-form'

// ajax
import axios from 'axios'

//定义 RadioItem
const RadioItem = Radio.RadioItem;

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

    // - 提交申请
    handleSubmit = () => {

        let {
            applyRefundOrder
        } = this.state

        axios({
            method: 'post',
            url: '/API/supplyChain/apply',
            data: {
                firstName: 'Fred',
                lastName: 'Flintstone'
            }
        });
        // fetch('/FrontJsonRefundOrder/ApplyRefundShop', {
        //     method: 'post',
        //     body: {
        //         applyRefundOrder: applyRefundOrder
        //     }
        // }).then(res => {
        //     this.context.router.goBack()
        // }, res => {
        //     if(res.ResultCode == 998) {
        //         this.setState({
        //             validation: {
        //                 show: true,
        //                 content: res.Message
        //             },
        //             inValid: true
        //         })
        //     }
        // })
    };

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

    render() {
        let me = this;
        let data = me.state.data;
        const {
            getFieldProps
        } = this.props.form; //表单属性

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
            amount: {},
            contactsName: {},
            contactsPhone: {},
            identity: {
                initialValue: data.identity,
                onChange: me.onIdentityChange.bind(me)
            },
            userName: {},
            userPhone: {},
            SMScode: {}
        }

        return (
            <form>
                {/* 选择融资类型 */}

                {/* 融资企业信息 */}
                <List renderHeader={() => <h3>融资企业信息</h3>} className="customs-form-components no-border-bottom form-box-in-1">
                    <Picker {...getFieldProps('financeType',fieldProps['financeType'])} data={data.financeTypesArr} cols={1} className="forss">
                      <List.Item arrow="horizontal">选择融资类型</List.Item>
                    </Picker>
                    <InputItem
                        {...getFieldProps('coreEnterprises')}
                        clear labelNumber={6.5}
                        className="input-extra-for-btn"
                        extra={<Button className="btn" data-seed="getCode" type="primary" inline size="small" onClick={e => console.log(e)}><Icon type="plus" /></Button>}>
                        对应核心企业
                    </InputItem>
                    <InputItem {...getFieldProps('financeEnterprise',fieldProps['financeEnterprise'])} clear placeholder="请输入您的企业名称" labelNumber={6}>融资企业</InputItem>
                    <InputItem {...getFieldProps('amount',fieldProps['amount'])} clear extra="万元" labelNumber=''>{ data.financeType[0] == 1 ? '存量应收账款' : '应付订单总额' }</InputItem>
                    <InputItem {...getFieldProps('contactsName',fieldProps['contactsName'])} clear labelNumber={6} placeholder="联系人姓名">企业联系人</InputItem>
                    <InputItem {...getFieldProps('contactsPhone',fieldProps['contactsPhone'])} clear labelNumber={6} type="phone" placeholder="手机号码">联系电话</InputItem>
                </List>

                {/* 推荐人信息 */}
                <List renderHeader={() => <div><h3>推荐人信息</h3><p>填写您的信息以便我们沟通合作</p></div>} className="customs-form-components no-border-bottom form-box-in-2">
                    <Picker {...getFieldProps('identity',fieldProps['identity'])} data={data.identitiesArr} cols={1} className="forss">
                      <List.Item arrow="horizontal">推荐人身份</List.Item>
                    </Picker>
                    <InputItem {...getFieldProps('userName',fieldProps['userName'])} clear labelNumber={5} placeholder="推荐人真实姓名">真实姓名</InputItem>
                    <InputItem {...getFieldProps('userPhone',fieldProps['userPhone'])} clear labelNumber={5} placeholder="推荐人手机号码">手机号码</InputItem>
                    <InputItem
                        {...getFieldProps('SMScode',fieldProps['SMScode'])}
                        clear labelNumber={5}
                        className="input-extra-for-btn"
                        extra={<Button className="btn" data-seed="getCode" type="primary" inline size="small" onClick={e => console.log(e)}>获取验证码</Button>}>
                        验证码
                    </InputItem>
                </List>

                {/* 表单提交 */}
                <div className="appli-form-btn-box">
                    <Button className="btn" type="primary" htmlType="submit" onClick={ e => this.handleSubmit }>立即登记</Button>
                </div>
            </form>
        )
    }
}

export default createForm()(AppliForm)