import React from 'react' ;
import css from './index.module.scss';
import store from '../../store';
import axios from 'axios';
import Footer from '../Footer'
class Font extends React.Component{
	constructor(props){
		super(props);
		this.state={
			datalist:[''],
			page:2
		}
	}

	render(){
		return <div className={css.main}>
			<div className={css.clear}>
				{
					this.state.datalist.map(item=>
							<div key={Math.random()} className={css.intro} onClick={this.gotoDetail.bind(this,item.worksID)}>
								<img src={item.cover} alt=""/>
								<p className={css.title}>{item.title}</p>
								<p className={css.origin}>原创--{item.className}</p>
								<p className={css.small}>
									<i className="iconfont icon-yanjing"></i>
									<span>{item.readCount}</span>
									<i className="iconfont icon-jushoucang"></i>
									<span>{item.replyCount}</span>
									<span className={css.stright}></span>
									<span className={css.gohome}>回家</span>
									<span className={css.hours}>{item.timeSpan}</span>
								</p>
							</div>
						)
				}

			</div>
			
			<div className={css.loadmore} onClick={this.loadmoreClick.bind(this)}>加载更多</div>

			<Footer></Footer>


		</div>
	}

	componentWillMount(){
		console.log('works',store.getState().navListReducer)
	
		axios.get('/API/Works?cate=all&recommend=4&page=1&pageSize=12').then((res)=>{
			console.log('res',res.data);
			this.setState({
				datalist:res.data
			})
		}).catch((err)=>{
			console.log(err);
		})

	}
	componentDidMount(){
		console.log(this.state.isShow)
	}
	componentWillUnmount(){
		//axios.abort()
	}

	loadmoreClick(){
		this.setState({
			page:this.state.page+1
		})
		console.log('nowpage',this.state.page)
		if(this.state.page<12){
			axios.get(`/API/Works?recommend=2&page=${this.state.page}&pageSize=12`).then((res)=>{
				this.setState({
					datalist:[...this.state.datalist,...res.data]
				})
			}).catch((err)=>{
				console.log(err);
			})
		}	
	}

	gotoDetail(workId){
		console.log('todetail');
		this.props.history.push('/detail/'+workId)
	}

}

export default Font