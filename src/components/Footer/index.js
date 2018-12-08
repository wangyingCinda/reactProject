import React from 'react';
import css from './index.module.scss';

class Footer extends React.Component{
	render(){
		return <div className={css.main}>
			<div className={css.return}>
				<p>触屏版</p>
				<p>|</p>
				<p>电脑版</p>
				<p className={css.gobacktop} onClick={this.handleClick.bind(this)}>
					<i className="iconfont icon-shangfan"></i>
					回顶部
				</p>
			</div>

			<div className={css.foot}>
				Copyright&copy; 2006-2007 CNDESIGN
			</div>
		</div>
	}

	handleClick(){
		console.log('click');

		var id = window.setInterval(()=>{
			var pos = window.pageYOffset;
			if(pos>0){
				window.scrollTo(0,pos-50);
			} else {
				window.clearInterval(id)
			}
			     
		},10)
		
	}
}	

export default Footer