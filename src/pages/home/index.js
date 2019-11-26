import React,{Component} from 'react'
import './index.less'
import { article,classify,label } from '@c/api'
import { List,Button } from 'antd';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
//监听总线通知
import EventTypes from '../../public/EventTypes';
import EventBus from 'react-native-event-bus'
export default class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			loading: false,
			pageNum: 1,
			pageSize: 5,
			articleList:[],
			total:null,
			showArticleList:[],
			classifyList:[],
			labelList:[],
			title:'最近动态'
		}
	}
	componentDidMount(){
		this.getData();
		classify.classifyList().then(res=>{
			this.setState({
				classifyList:res.data.classifyList
			})
		})
		//请求标配label
		label.labelList().then(res=>{
			this.setState({
				labelList:res.data.labelList
			})
		})
		EventBus.getInstance().addListener(EventTypes.classify_select,this.classifySelectListener  = data =>{
			this.setState({
				title:"` "+data.value+"` 分类下的文章"
			})
			this.filtrateList(data)
		})
		EventBus.getInstance().addListener(EventTypes.label_select,this.labelSelectListener  = data =>{
			this.setState({
				title:"` "+data.value+"` 标签下的文章"
			})
			this.filtrateList(data)
		})
	}
	componentWillUnmount(){
   		EventBus.getInstance().removeListener(this.classifySelectListener);
    	EventBus.getInstance().removeListener(this.labelSelectListener);
  	}
	filtrateList(data){
		const { pageNum,pageSize} = this.state;
		article.filtrateList(data).then(res=>{
			this.setState({
				articleList:res.data.articleList,
				total:res.data.total,
				showArticleList:res.data.articleList.slice(0,pageNum*pageSize)
			})
		})
	}
	_findId = (id,par) =>{
		let $name = null;
		if(par == 'classify'){
			this.state.classifyList && this.state.classifyList.map(item=>{
				if(item._id == id){
					$name = item.classify_name
				}
			})
		}else{
			this.state.labelList && this.state.labelList.map(item=>{
				if(item._id == id){
					$name = item.label_name
				}
			})
		}
		return(<span>{$name}</span>)
	}
	getData(){
		const { pageNum,pageSize} = this.state;
		article.articleList().then(res=>{
			this.setState({
				articleList:res.data.articleList,
				total:res.data.total,
				showArticleList:res.data.articleList.slice(0,pageNum*pageSize)
			})
		})
	}
	onLoadMore = () => {
		const { pageNum,pageSize} = this.state;
		let showArticleList = this.state.showArticleList.concat(this.state.articleList.slice((pageNum)*pageSize,(pageNum+1)*pageSize));
		this.setState({
			showArticleList,
			pageNum:pageNum+1
		})
	}
	_renderItem = (item) =>{
		return (
			<div className="article_item">
				<div className="article_title">
					{this._findId(item.classify,'classify')}
					<span>{item.title}{this.context.currentSearchType}</span>
				</div>
				<div className="desc">
					{item.author}发表于{moment(item.createTime).format('YYYY-MM-DD')},    标签：{this._findId(item.tag,'label')}
				</div>
				<ReactMarkdown
		            className="markdown-body"
		            source={item.content}
		          />
		        <div className="coverPlan image_wrap"><img src={item.coverPlan}/></div>
			</div>
		)
	}
	render(){
		const { showArticleList,total,pageNum,pageSize,title } = this.state;
		const loadMore =
	      pageNum*pageSize < total? (
	        <div
	          style={{
	            textAlign: 'center',
	            marginTop: 12,
	            height: 32,
	            lineHeight: '32px',
	          }}
	        >
	          <div onClick={this.onLoadMore} className="loadMore">加载更多</div>
	        </div>
	      ) : null;
		return(
			<div className="home_section">
				<h2>
					<span>{title}</span>
				</h2>
				<div className="article_list">
					<List
					    dataSource={showArticleList}
					    loading={this.state.loading}
					    loadMore={loadMore}
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