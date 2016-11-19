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
