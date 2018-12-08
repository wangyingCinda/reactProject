import React from 'react';
import css from './index.module.scss';
import store from '../../store';
var img1 = require('../../assets/imgs/headbar.gif');
var img2 = require('../../assets/imgs/close.gif');
var img3 = require('../../assets/imgs/logo.gif');
var img4 = require('../../assets/imgs/search.gif');
var img5 = require('../../assets/imgs/ling.gif');

class Headbar extends React.Component{
	constructor(props){
		super(props);
		this.state={
			nowShowing:true,
			headShow:true
		}
	}

	render(){
		return <div className={this.state.headShow?css.main:css.notmain}>
			<img src={img1} alt="" className={this.state.nowShowing?css.img1:css.nott} onClick={this.handleClick.bind(this)}/>
			<img src={img2} alt="" className={this.state.nowShowing?css.nott_close:css.img_close} onClick={this.handleClick.bind(this)}/>
			
			<img src={img3} alt="" className={css.img2}/>
			<img src={img4} alt="" className={css.img3}/>
			<img src={img5} alt="" className={css.img4}/>
		</div>
	}

	handleClick(){
		store.dispatch({
			type:'didShow',
			payload:!store.getState().headReducer
		})

		if(store.getState().headReducer === true){
			console.log('true')
			window.onmousewheel = document.onmousewheel = function(evt){
				return false;
			}
			/*window.ontouchmove = document.ontouchmove = function(e){
				console.log('ting')
				e.preventDefault && e.preventDefault();
	            e.returnValue=false;
	            e.stopPropagation && e.stopPropagation();
	            return false;
			}*/
		} else {
			console.log('false');
			window.onmousewheel = document.onmousewheel = function(evt){
				return true;
			}
		}

	}

	componentWillMount(){
		store.subscribe(()=>{
			this.setState({
				nowShowing:!store.getState().headReducer
			})
		})

		store.subscribe(()=>{
			this.setState({
				headShow:store.getState().registerReducer
			})
			console.log('yes')
		})
	}
}

export default Headbar