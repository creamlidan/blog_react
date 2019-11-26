import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import { Layout } from 'antd';
import PropTypes from "prop-types";
import SlideBar from '../common/slideBar'
const { Header, Content } = Layout;
import './index.less'
import EventTypes from '../../public/EventTypes';
import EventBus from 'react-native-event-bus'
export default class Frame extends Component{
	static contextTypes = {
	    router: PropTypes.shape({
	      history: PropTypes.shape({
	        push: PropTypes.func.isRequired,
	        replace: PropTypes.func.isRequired,
	        createHref: PropTypes.func.isRequired
	      }).isRequired
	    }).isRequired
	}
	constructor(props,context){
		super(props,context);
		this.state = {
			navList:[{
				title:'首页',
				url:'/home',
				icon:'icon_home',
				key:1
			},{
				title:'项目',
				url:'/project',
				icon:'icon_project',
				key:2
			},{
				title:'留言',
				url:'/leave',
				icon:'icon_leave',
				key:3
			},{
				title:'关于',
				url:'/about',
				icon:'icon_about',
				key:4
			}],
			userInfo:{
				userImg:"/src/static/images/lidan.jpg",
				userMotto:"只要还有明天,今天就是起跑线"
			},
			currentSearchType:null,
			currentSearchType_value:null
		}
	}
	componentDidMount() {
		this._setCurrentNav(this.context.router.history.location.pathname)
	    this.context.router.history.listen(() => {
	    	this._setCurrentNav(this.context.router.history.location.pathname)
	    })
	}
	_setCurrentNav(pathName){
		this.setState({
			currentUrl:pathName
		})
	}
	_renderNav(item){
		return (
			<li key={item.key} className={this.state.currentUrl == item.url?'current':''}>
				<Link to={item.url}>
					<i className={`${item.icon} icon`}></i>
					<span>{item.title}</span>
				</Link>
			</li>
		)
	}
	onChangeName =(type,_id,value)=>{
		if(type == 'classify_name'){
			EventBus.getInstance().fireEvent(EventTypes.classify_select,{
				$type:'classify',
				_id,
				value
			});
		}else if(type == 'label_name'){
			EventBus.getInstance().fireEvent(EventTypes.label_select,{
				$type:'tag',
				_id,
				value
			});
		}
	}
	render(){
		const { navList,userInfo} = this.state;
		return(
			<Layout className="page">
				<Header className="header">
					<div className="scope">
						<div className="nav_list">
							<ul>
								{navList.map((item)=>{
									return this._renderNav(item)
								})}
							</ul>
						</div>
						<div className="userInfo">
							<div className="feeds">
								<p className="links">
                        			<a href="https://github.com/creamlidan" target="_blank">Github</a>
                        			|
                        			<a href="" target="_blank">Hosted by Coding Pages</a>
                				</p>
								<p className="motto">{userInfo.userMotto}</p>
							</div>
							<div className="image_wrap">
								<img src={userInfo.userImg}/>
							</div>
						</div>
					</div>
				</Header>
				<Layout className="scope main_wrap">
					<Content
			          style={{
			            background: '#fff',
			            padding: 24,
			            margin: 0,
			            minHeight: 280,
			            position:'relative',
			            flex:1
			          }}
			        >
			        	{this.props.children}
			        </Content>
			        <div className="slide_wrap"><SlideBar onChangeName={this.onChangeName}/></div>
				</Layout>
			</Layout>
		)
	}
}
