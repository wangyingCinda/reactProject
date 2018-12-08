import React from 'react';
import css from './index.module.scss';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import store from '../../store'


class DesignerRegister extends React.Component{
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

	usernameChange= (evt)=>{
		
		this.setState({
			usernameValue:evt.target.value
		})
		console.log('change',this.state.usernameValue);
	}

	passwordChange= (evt)=>{
		//console.log('change',evt.target.value)
		this.setState({
			passwordValue:evt.target.value
		})
		console.log('change',this.state.passwordValue);
	}

	handleRegister(){
		if(this.state.usernameValue && this.state.passwordValue){
			axios.post('/ddd/register',{
				username:this.state.usernameValue,
				password:this.state.passwordValue
			}).then(res=>{
				console.log('register sucess',res.data);
					//this.props.history.push('/login');
					window.herf='/login';
			})
		} else {
			window.alert("请输入用户名和密码");
		}
		
	}

	/*componentWillUnmount(){
		store.dispatch({
			type:'registerHead',
			payload:true
		})
	}*/
}

export default DesignerRegister