import React from 'react';
import css from './index.module.scss';
import store from '../../store';
import {NavLink} from 'react-router-dom';

class Register extends React.Component{
	constructor(props){
		super(props);
		this.state={

		}
	}

	render(){
		return <div className={css.main}>
			<div className={css.head}>
				<i className="iconfont icon-fanhui" onClick={this.returnClick.bind(this)}></i>
				<span>注册</span>
			</div>

			<div className={css.choose}>
				<NavLink to="/register/agency" className={css.inner} activeClassName="actives">我是设计师</NavLink>
				<NavLink to="/register/designer" className={css.inner} activeClassName="actives">我是机构</NavLink>
			</div>

			{this.props.children}
		</div>
	}

	componentWillMount(){
		store.dispatch({
			type:'nav',
			payload:false
		})
		store.dispatch({
			type:'registerHead',
			payload:false
		})
	}

	componentWillUnmount(){
		store.dispatch({
			type:'registerHead',
			payload:true
		})
	}
	returnClick(){
		console.log('return');
		window.history.back();
	}
	/*componentWillUnmount(){
		store.dispatch({
			type:'registerHead',
			payload:true
		})
	}*/
}

export default Register