import React,{Component} from 'react'
import './slideBar.less'
import { classify,label } from '@c/api'
export default class SlideBar extends Component{
	constructor(props){
		super(props);
		this.state = {
		    classifyList:[],
		    labelList:[]
		}
	}
	componentDidMount(){
		this.getData();
	}
	getData(){
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
	_renderSlideItem(item,type){
		if(item.article_nums >0){
			return (<span key={item._id} onClick={()=>this.handleClick(type,item._id,item[type])}>{item[type]} ({item.article_nums})</span>)
		}else{
			return null;
		}
		
	}
	handleClick = (type,_id,value)=> {
        this.props.onChangeName(type,_id,value);
    }

	render(){
		const { classifyList,labelList} = this.state;
		return(
			<div className="slideBar_wrap">
				<section>
					<h2>
						<span>文章分类</span>
					</h2>
					<div className="slide_item">
						{
							classifyList.map((item)=>{
								return this._renderSlideItem(item,'classify_name')
							})
						}
					</div>
				</section>
				<section>
					<h2>
						<span>热门标签</span>
					</h2>
					<div className="slide_item">
						{
							labelList.map((item)=>{
								return this._renderSlideItem(item,'label_name')
							})
						}
					</div>
				</section>
			</div>
		)
	}
}