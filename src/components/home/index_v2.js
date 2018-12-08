import React from 'react'
import css from './index.module.scss';
import axios from 'axios';
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
import Footer from '../Footer';
import store from '../../store';

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={
			swiperDatalist:[''],
			src:'a',
			a:0,
			datalist:[''],
			page:2
		}
	}

	render(){
		console.log('render');
		return <div className={css.main}>
			
			
			<div className="swiper-container kerwina">
				 <div className="swiper-wrapper">
			      {this.state.swiperDatalist.map(item=>
						<div className="swiper-slide" key={Math.random()}>
							<div style={{width:'100%'}}>
								<img style={{width:'100%'}} src={item.cover} alt="" />
							</div>
						</div>
			      	)}
			    </div>
			    <div className="swiper-pagination"></div>
			 </div>
			
			<p className={css.good}>
				<span className={css.first}>丨</span>
				<span className={css.second}>推荐作品</span>
			</p>

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
		axios.get('/Api/Base/SliderBannel').then((res)=>{
			this.setState({
				swiperDatalist:res.data.Data
			},()=>{
				var swiper =  new Swiper('.swiper-container', {
						      autoplay: {
						        delay: 1000,
						        disableOnInteraction: false,
						      },
						      pagination: {
						        el: '.swiper-pagination',
						        clickable: true,
						      },
						      navigation: {
						        nextEl: '.swiper-button-next',
						        prevEl: '.swiper-button-prev',
						      },
				 });
			})
		}).catch((err)=>{
			console.log(err);
		})

		axios.get('/API/Works?recommend=2&page=1&pageSize=12').then((res)=>{
			console.log('res',res.data);
			this.setState({
				datalist:res.data
			})
		}).catch((err)=>{
			console.log(err);
		})

		store.dispatch({
			type:'nav',
			payload:true
		})
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

export default Home