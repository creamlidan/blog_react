import React from 'react'
import ReactDOM from 'react-dom'

//引入自定义全局样式
import './static/css/base.less';
import RouterMap from './config/router_config.js'
ReactDOM.render(<RouterMap/>,document.getElementById("app"))
