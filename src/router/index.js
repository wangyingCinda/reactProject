
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import Home from '../components/home/index_v2.js';
import Works from '../components/works';
import Infomation from '../components/infomation/';
import Article from '../components/article';
import Font from '../components/font';
import Detail from '../components/detail';
import Register from '../components/register';
import AgencyRegister from '../components/agencyRegister';
import DesignerRegister from '../components/designerRegister';
import DetailV2 from '../components/detailV2.js';
import Login from '../components/login'
import React from 'react';
import App from '../App.js';

const router = <Router>
	<App>
		<Switch>
			<Route path="/home" component={Home}/>
			<Route path="/works" component={Works}/>
			<Route path="/infomation" component={Infomation}/>
			<Route path="/article" component={Article}/>
			<Route path="/font" component={Font}/>
			<Route path="/detail/:id" component={Detail}/>
			<Route path="/register" render={()=>
				<Register>
					<Switch>
						<Route path="/register/designer" component={AgencyRegister}/>
						<Route path="/register/agency" component={DesignerRegister}/>
						<Redirect from="/register" to="/register/designer"/>
					</Switch>
				</Register>
			}/>
			<Route path="/login" component={Login}/>
			<Route path="/detailV2/:id" component={DetailV2}/>
			<Redirect from="/" to="/home"></Redirect>
		</Switch>
	</App>
</Router> 

export default router