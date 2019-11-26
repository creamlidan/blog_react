import React,{Component} from 'react'
import './index.less'
export default class About extends Component{
	render(){
		return(
			<div className="about_section">
				<div className="section">
					<h2><i className="icon icon_setting"></i>关于我</h2>
					<p>
						<i className="icon icon_office"></i>
						<span>坐标：北京</span>
					</p>
					<p>
						<i className="icon icon_newspaper"></i>
						<span>工作：前端</span>
					</p>
					<p>
						<i className="icon icon_envelop"></i>
						<span>联系邮箱：</span>
						<code>creamlidan@163.com</code>
					</p>
				</div>
				<div className="section">
					<h2><i className="icon icon_setting"></i>关于博客</h2>
					<p>
						<i className="icon icon_files_empty"></i>
						<span>1：记录学习和工作中的总结和DEMO</span>
					</p>
					<p>
						<i className="icon icon_files_empty"></i>
						<span>2：一些七大姑八大姨的琐事！</span>
					</p>
				</div>
				<div className="section">
					<h2><i className="icon icon_setting"></i>Github账号</h2>
					<p><a href="https://github.com/creamlidan" target="_blank">我的Github</a></p>
				</div>
			</div>
		)
	}
}