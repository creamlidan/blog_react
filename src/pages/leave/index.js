import React,{Component} from 'react'
import './index.less'
export default class Leave extends Component{
	render(){
		return(
			<div className="leave_section">
				<div className="weChat_qr image_wrap">
					<img src="/src/static/images/wechat_qr.jpg"/>
				</div>
				<p>
				  如果觉得您也刚好是前端爱好者,欢迎关注公众号交流！<br/>
				  （虽然现在空空的,以后会持续更新....）
				</p>
			</div>
		)
	}
}