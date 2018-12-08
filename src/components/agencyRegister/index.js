import React from 'react';
import css from './index.module.scss';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import store from '../../store'

class Agencyregister extends React.Component{
	constructor(props){
		super(props);
		this.state={
			usernameValue:'',
			passwordValue:''
		}
	}
	render(){
		return <div className={css.main}>
			<p>
				<input type="text" placeholder="手机号" value={this.state.usernameValue} onChange={this.usernameChange}/>
				<span>请输入11位手机号</span>
			</p>
			<p>
				<input type="password" placeholder="密码" value={this.state.passwordValue} onChange={this.passwordChange}/>
				<span>请输入六位数字密码</span>
			</p>
			<p className={css.havelogname}>
				<NavLink to="/login">用现有账号登陆</NavLink>
			</p>
			<p className={css.regist} onClick={this.handleRegister.bind(this)}>注册</p>
		</div>
	}

	usernameChange= (evt)=>{
		
		this.setState({
			usernameValue:evt.target.value
		})
	}

	passwordChange= (evt)=>{
		this.setState({
			passwordValue:evt.target.value
		})
	}

	handleRegister(){

		var name = this.state.usernameValue;
		var password = this.state.passwordValue;

		var strDeg = /1[0-9]{10}/;
		var passwordDeg = /[0-9]{6}/;
		if(strDeg.test(name) && passwordDeg.test(password)){
			axios.post('/ddd/register',{
				username:this.state.usernameValue,
				password:this.state.passwordValue
			}).then(res=>{
				console.log('register sucess',res.data);
					this.props.history.push('/login');
			})
		} else {
			window.alert("请输入用户名和密码");
		}
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

	/*componentWillUnmount(){
		store.dispatch({
			type:'registerHead',
			payload:true
		})
	}*/
}

export default Agencyregister