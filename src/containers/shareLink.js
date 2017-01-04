/*
// 分享链接
// --------------------------------------------------
*/

// 依赖框架
import React, { Component } from 'react'

// 公用组件
import { Header, Footer, SharePanel } from 'components'

// am 组件
import { TextareaItem, List, Button, Popup, Icon } from 'antd-mobile';

// react-router 组件
import { Link } from 'react-router';

// ajax
import axios from 'axios'

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  // Note: the popup content will not scroll.
  wrapProps = {
    // onTouchStart: e => e.preventDefault(),
  };
}

//创建并输出页面组件
export default class ShareLink extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    // 打开分享面板
    sharePanelShow() {

        let copyCon = document.getElementById('csv');

        copyCon.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令

        // 展示分享面板
        Popup.show(
            <div>
                <div className="fn-pa-20">
                    <p className="share-tips fn-mb-20">
                        <Icon type="check-circle"/>
                        复制成功，可以粘贴分享到以下网站！
                    </p>
                    <SharePanel/>
                </div>
                <Button
                    type="default"
                    htmlType="button"
                    style={
                        {
                            borderBottom: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 0
                        }
                    }
                    onClick={
                        this.sharePanelHide.bind( this )
                    }
                >
                    取消
                </Button>
            </div>
        );
    }

    // 关闭分享面板
    sharePanelHide() {
        Popup.hide();
    }

    render() {

        let me = this;

        const title = '推广链接分享'; // 导航文案

        const shareLink = '我在E+供应链云平台，这里融资更轻松，邀请你一起来http://www.paywe.cn/?t='

        return (
            <div className="container-inner">
                {/* nav */}
                <Header
                    title={ title }
                    inUser={ true }
                    linkTo="UserCenter"
                />
                <div id="gylypt-user-center">
                    <h3 className="title animated fadeInDown">您的分享内容是：</h3>
                    <List className="only-textarea animated fadeInDown">
                        <TextareaItem
                            //disabled
                            readOnly
                            labelNumber={ 0 }
                            value={ shareLink }
                            rows={ 3 }
                            id='csv'
                         />
                    </List>
                    <div className="gylypt-single-button-wrap animated fadeInUp">
                        <Button
                            type="primary"
                            onClick={
                                me.sharePanelShow.bind( me )
                            }
                        >
                            复制并分享
                        </Button>
                    </div>
                </div>
                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
}
