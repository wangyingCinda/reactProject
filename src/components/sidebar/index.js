import React from 'react';
import css from './index.module.scss';
import store from '../../store';
import {NavLink} from 'react-router-dom';
var img1 = require('../../assets/imgs/logo.gif');

class Sidebar extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isShow:false,
			isMove:false
		}
	}

	render(){
		return <div className={this.state.isShow?css.main:css.notShow}>
			<div className={css.content}>
				<NavLink to="/login" onClick={this.handleClick.bind(this)}>
					<img src={img1} alt=""/>
					<p>请登录</p>
				</NavLink>
				<ul>
					<li>
						<span>丨</span>
						<NavLink to='/home' tag="span" onClick={this.handleClick.bind(this)}>首页</NavLink>
					</li>
					<li>
						<span>丨</span>
						<NavLink to='/works' tag="span" onClick={this.handleClick.bind(this)}>作品</NavLink>
					</li>
					<li>
						<span>丨</span>
						<NavLink to='/infomation' tag="span" onClick={this.handleClick.bind(this)}>资讯</NavLink>
					</li>
					<li>
						<span>丨</span>
						<NavLink to='/article' tag="span" onClick={this.handleClick.bind(this)}>文章</NavLink>
					</li>
					<li>
						<span>丨</span>
						<NavLink to='/font' tag="span" onClick={this.handleClick.bind(this)}>字体</NavLink>
					</li>
					<li className={css.last}>
						<NavLink to='/register' tag="span" onClick={this.handleClick.bind(this)}>注册</NavLink>
					</li>
				</ul>

			</div>
		</div>
	}

	componentWillMount(){
		store.subscribe(()=>{
			console.log('shoudaole');
			this.setState({
				isShow:store.getState().headReducer
			})
		})
	}

	handleClick(){
		store.dispatch({
			type:'didShow',
			payload:!this.state.isShow
		})
	}
	toRegister(){
		//this.props.history.push('/register');  为什么不能够进行跳转
		console.log('click');
		//location.href="/register";
	}

	componentWillUnmount(){
		store.dispatch({
			type:'nav',
			payload:true
		})
	}
}

export default Sidebar