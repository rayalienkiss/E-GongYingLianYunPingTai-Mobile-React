/*
// 分享组件
// --------------------------------------------------
*/

import React, { Component } from 'react'

export default class SharePanel extends Component {

    componentDidMount() {
        
        var script = document.createElement('script');
        //var sharePanel = document.getElementById('id')
        script.src = "http://v3.jiathis.com/code/jia.js";
        document.body.appendChild(script);
    }

    render() {

        return (
            <div className="share-panel">
                <div className="jiathis_style_32x32">
                  <a className="jiathis_button_tsina"></a>
                  <a className="jiathis_button_tqq"></a>
                  <a className="jiathis_button_weixin"></a>
                  <a className="jiathis_button_linkedin"></a>
                </div>
            </div>
        )
    }
}
