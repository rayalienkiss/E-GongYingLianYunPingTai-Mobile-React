/*
// 分享链接
// --------------------------------------------------
*/

// 依赖框架
import React, { Component } from 'react';

// 公用组件
import { Header, Footer, SharePanel } from 'components';

// am 组件
import { TextareaItem, List, Button, Popup, Icon, Toast } from 'antd-mobile';

// Clipboard 剪贴板插件
import clipboard from 'Clipboard';

// react-router 组件
import { Link } from 'react-router';

// ajax
import axios from 'axios';

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
            data: {
                link: 'link',
            }
        };
    }

    // 打开分享面板
    sharePanelShow() {
        // 展示分享面板
        Popup.show(
            <div>
                {/* <div className="fn-pa-20">
                    <p className="share-tips fn-mb-20">
                        <Icon type="check-circle"/>
                        复制成功，可以粘贴分享到以下网站！
                    </p>
                    <SharePanel/>
                </div> */}
                <SharePanel/>
                <div className="fn-pl-20 fn-pr-20 fn-pb-20">
                    <Button
                        type="default"
                        htmlType="button"
                        onClick={
                            this.sharePanelHide.bind( this )
                        }
                    >
                        取消分享
                    </Button>
                </div>
            </div>
        );
    }

    // 分享链接的复制 用 Clipboard 实现
    useClipboard() {
        // 初始化
        var letClipboard = new clipboard( '.forClipboard' );
        //优雅降级:safari 版本号>=10,提示复制成功;否则提示需在文字选中后，手动选择“拷贝”进行复制
        letClipboard.on( 'success', function( e ) {
            Toast.success( '复制成功，可以粘贴分享到以上网站！',2 );
            e.clearSelection();
        });
        letClipboard.on( 'error', function( e ) {
            Toast.fail( '请选择“拷贝”进行复制!', 2 );
        });
    }

    // 关闭分享面板
    sharePanelHide() {
        Popup.hide();
    }

    // 获取个人信息页面的接口
    getRes() {

        let me = this;

        let data = me.state.data;

        axios.get(
            '/api/user/info'
        )
        .then( res => {

            const { link } = data = res.data.data;

            this.setState({
                data
            });
        });
    }

    componentDidMount() {
        this.getRes();
        this.useClipboard();
    }

    render() {

        let me = this;

        let data = me.state.data;

        const { link } = data;

        const shareLink = '我在E+供应链云平台，这里融资更轻松，邀请你一起来http://www.paywe.cn/?t=' + link

        return (
            <div className="container-inner">
                {/* nav */}
                <Header
                    title="推广链接分享"
                    inUser={ true }
                    linkTo="UserCenter"
                />
                <div id="gylypt-user-center">

                    <h3 className="title animated fadeInDown">您的分享内容是：</h3>
                    {/* <List className="only-textarea animated fadeInDown">
                        <TextareaItem
                            //disabled
                            readOnly
                            labelNumber={ 0 }
                            value={ shareLink }
                            rows={ 3 }
                            id='csv'
                         />
                    </List> */}
                    {/* 展示会被 Clipboard 复制的内容 */}
                    <p className="share-link animated fadeInDown">
                        { shareLink }
                    </p>
                    <div className="gylypt-single-button-wrap animated fadeInUp">
                        <Button
                            className="forClipboard"
                            data-clipboard-text={ shareLink }
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
