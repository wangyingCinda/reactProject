import React from 'react';
import css from './index.module.scss';
import store from '../../store';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
//import {getCookie,setCookie} from './cookie.js';

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={
			phone:'',
			password:''
		}
	}

	render(){
		return <div className={css.main}>
			<div className={css.head}>
				<i className="iconfont icon-fanhui" onClick={this.returnClick.bind(this)}></i>
				<span className={css.span}>登陆</span>
				<NavLink to="/register" className={css.right}>注册</NavLink>
			</div>

			<div className={css.choose}>
				<span className={css.name}>账号登陆</span>
				<span>短信登陆</span>
			</div>

			<div className={css.input}>
				<input type="text" placeholder="手机号" value={this.state.phone} onChange={this.phoneChange}/>
				<input type="password" placeholder="密码" value={this.state.password} onChange={this.passwordChange}/>
			</div>

			<div className={css.remember}>
				<input type="checkbox"/><span>下次自动登录</span><span>忘记密码</span>
			</div>

			<p className={css.log} onClick={this.logClick.bind(this)}>登陆</p>

		</div>
	}

	componentWillMount(){
		console.log('login',store.getState().registerReducer);
		store.dispatch({
			type:'registerHead',
			payload:false
		})
		store.dispatch({
			type:'nav',
			payload:false
		})
	}
	returnClick(){
		console.log('return');
		window.history.back();
	}
	componentWillUnmount(){
		store.dispatch({
			type:'registerHead',
			payload:true
		})
	}
	phoneChange=(evt)=>{
		this.setState({
			phone:evt.target.value
		})
	}
	passwordChange=(evt)=>{
		this.setState({
			password:evt.target.value
		})
	}

	logClick(){
		axios.post('ddd/login',{
			username:this.state.phone,
			password:this.state.password
		}).then((res)=>{
			console.log(res.data);
			if(res.data.length !== 0){
				// setCookie('name',res.data[0].username);
				var str = encodeURIComponent('name')+'='+encodeURIComponent(res.data[0].username);
				document.cookie = str;
				this.props.history.push('/home');
			} else {
				window.alert('请输入正确的密码')
			}
		})
	}
	
}

export default Login