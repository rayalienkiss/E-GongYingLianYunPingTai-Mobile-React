import React from 'react';
import axios from 'axios';

let start = () => {
    // console.log(a)
    // let {
      // location
    // } = this.props;

    // const url = helper.urlAddParam('/api/shareUrl', {
      // // shareUrl: location.href,
      // shareUrl: 'http://www.paywe.cn',
    // });
    const url = '/api/shareUrl?shareUrl=' + encodeURIComponent(location.href)
    // // console.log(location)

    axios.get(url).then(res => {
        // if (res.data && res.data.code == 200) {
            // //  短信发送成功TODO
            // me.smsCodeTimerStart();
        // } else {
            // Toast.fail(res.data.message, 1.5);
        // }
    // })
        // console.log(res)
        // console.log(res)
        // var token = {
            // noncestr: "fc328cfb-6d40-46ca-8ddb-c2b380b17f98",
            // jsapi_ticket: "kgt8ON7yVITDhtdwci0qeXvhgWq0-hbBHMF3mkGbQqe9j3zEts3H37KIq7VaClKjj6xL28sSI4dUtfAjc1UyTQ",
            // timestamp: 1481188590090,
            // url: "http://www.paywe.cn",
            // signature: "f37725ff3cb80452672069b57d1ef610c5f0bf7c"
        // }

        res.jsApiList = ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ'];
        // res.debug = true;
        res.nonceStr = res.noncestr;
        wx.config(res);
        // wx.config({
            // debug: true,
            // appId: 'wx51540977d1bcc9e2', // 必填，公众号的唯一标识
            // timestamp: token.timestamp, // 必填，生成签名的时间戳
            // nonceStr: token.noncestr, // 必填，生成签名的随机串
            // signature: token.signature,// 必填，签名
            // jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ'] // 必填，需要使用的JS接口列表
        // });
        var share_config = {
            "share": {
                "imgUrl": require('img/e_logo.png'),
                "desc": "E+供应链云平台，助力供应链上下游的企业轻松融资",
                "title": "E+供应链云平台",
                "link": res.url,
                "success": function (a, b) {//分享成功后的回调函数
                    // console.log('success', a, b)
                },
                "cancel": function (a, b) {
                    // console.log('cancel', a, b)
                }
            }
        };
        wx.ready(function () {
            wx.onMenuShareAppMessage(share_config.share);//分享到朋友圈
            wx.onMenuShareTimeline(share_config.share);//分享到朋友圈
            wx.onMenuShareQQ(share_config.share);//分享给手机QQ
        });
        wx.error(function(res){
            console.log(res)
        });
    });
}

start();
