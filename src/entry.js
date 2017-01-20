/*
 * 入口文件
 */

// 导入公共样式
import 'public/less/app'

import React from 'react'
import { render } from 'react-dom'

// 路由配置
import routes from 'routes'

// 渲染模板
render(
    routes,
    document.getElementById('app')
)

// 百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?2acaebc1ef0d040c6f8117602345064b";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
