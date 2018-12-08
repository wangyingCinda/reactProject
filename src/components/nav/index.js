import React from 'react';
import css from './index.module.scss';
import {NavLink} from 'react-router-dom';
import store from '../../store';


class Nav extends React.Component{
	constructor(props){
		super(props);
		this.state={
			count:2,
			headShow:true
		}
	}

	render(){
		return <div className={this.state.headShow?css.main:css.notmain}>
			<ul>
				<NavLink activeClassName="active" to="/home" tag="li" className={css.li}>首页</NavLink>
				<NavLink activeClassName="active" to="/works" tag="li" className={css.li} onClick={this.handleClick.bind(this)}>作品
					<i className="iconfont icon-jiantouxia"></i>
				</NavLink>
				<NavLink activeClassName="active" to="/infomation" tag="li" className={css.li}>资讯</NavLink>
				<NavLink activeClassName="active" to="/article" tag="li" className={css.li}>文章</NavLink>
				<NavLink activeClassName="active" to="/font" tag="li" className={css.li}>字体</NavLink>
			</ul>
		</div>
	}

	componentWillMount(){
	
		store.subscribe(()=>{
			this.setState({
				headShow:store.getState().registerReducer
			})
		})

		store.subscribe(()=>{
			this.setState({
				headShow:store.getState().nav
			})
		})

		console.log('ban',store.getState().registerReducer)
	}

	handleClick(){
		this.setState({
			count:this.state.count+1
		})
		//console.log('count',this.state.count)

		//作品里面的一堆表格
		if(this.state.count%2===0){
			//console.log('click',this.state.count);
			store.dispatch({
				type:'navList',
				payload:true
			})
		} else {
			store.dispatch({
				type:'navList',
				payload:false
			})
		}
		
	}
}

export default Nav