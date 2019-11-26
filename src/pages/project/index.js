import React,{Component} from 'react'
import './index.less'
import { project} from '@c/api'
import moment from 'moment';
import { List} from 'antd';

export default class Project extends Component{
	constructor(props){
		super(props)
		this.state ={
			projectList:[]
		}
	}
	componentDidMount(){
		this.getData();
	}
	getData(){
		project.projectList().then(res=>{
			this.setState({
				projectList:res.data.projectList
			})
		})
	}
	_renderItem = (item) =>{
		return(
			<div className="project_item">
				<div className="project_labelIcon">
					<i className="icon icon_label"></i>
				</div>
				<div>
					<div className="project_name">
						<span>{item.project_name}</span>
						<span className={item.project_status?'project_status online':'project_status'}>({item.project_status?'已上线':'未上线'})</span>
					</div>
					<div className="project_time"><span className="desc_label">项目时间：</span>{moment(item.project_startTime).format('YYYY.MM.DD')} 至 {moment(item.project_endTime).format('YYYY.MM.DD')}</div>
					<div className="project_desc">
						<div>
							<div className="desc_label">项目描述：</div>
							<div><a href={item.project_url} target="_blank"><i className="icon icon_code"></i></a></div>
						</div>
						<div dangerouslySetInnerHTML = {{__html:this._renderProjectDesc(item.project_desc)}}></div>
					</div>
					<div className="project_label" dangerouslySetInnerHTML = {{__html:this._renderProject(item.project_label)}} ></div>
				</div>
			</div>
		)
	}
	_renderProjectDesc = (projectDesc) =>{
		return `<div>${projectDesc}</div>`;
	}
	_renderProject = (projectLabel)=>{
		let $projectLabel = projectLabel.split('-');
		let str = ``;
		for(var i = 0; i < $projectLabel.length; i++){
			str += `<span style=color:#f98293;font-weight:bold;>${$projectLabel[i]}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>`
		}
		return projectLabel?str:null
	}
	render(){
		const {projectList} = this.state
		return(
			<div className="project_section">
				<div className="ad_img"><img src="/src/static/images/banner.jpg"/></div>
				<div className="project_list">
					<List
					    dataSource={projectList}
					    renderItem={item => (
							<List.Item
								key={item.title}
							>
					        {this._renderItem(item)}
					      </List.Item>
					    )}
					/>
				</div>
			</div>
		)
	}
}