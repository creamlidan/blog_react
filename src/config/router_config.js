import React,{Component} from 'react'
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import MyLayout from '../pages/frame/index'
import Home from '../pages/home/index'
import Project from '../pages/project/index'
import Leave from '../pages/leave/index'
import About from '../pages/about/index'
import AnimatedSwitch from '../pages/common/AnimatedSwitch'
class RouterMap extends Component {
	constructor(props) {
		super(props)
	}
	render(){
		const { props } = this;
		return (
			<Router history={props.history}>
				<Switch>
					<MyLayout>
						<Route path="/home" component={Home} />
						<Route path="/project" component={Project}/>
						<Route path="/leave" component={Leave}/>
						<Route path="/About" component={About}/>
						<Route path="/" exact render={()=> (
							<Redirect to="/home"/>
		           		)}/>
					</MyLayout>
				</Switch>
			</Router>
		)
	}
}
export default RouterMap