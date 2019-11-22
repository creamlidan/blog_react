import React,{Component} from 'react'
import './index.less'
import { article,classify,label } from '@c/api'
import { List,Button } from 'antd';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
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
			labelList:[]
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
					<span>{item.title}</span>
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
		const { showArticleList,total,pageNum,pageSize } = this.state;
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
					<span>最近动态</span>
				</h2>
				<div className="articleList">
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