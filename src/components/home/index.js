import React from 'react'
import css from './index.module.scss';
import axios from 'axios';
//import Swiper from "swiper";
//import "swiper/dist/css/swiper.css";
import ReactSwipe from 'react-swipe';
//import ReactDOM from 'react-dom';

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={
			swiperDatalist:[''],
			src:'a',
			a:0,
			datalist:['']
		}
	}

	render(){
		console.log('render');
		return <div className={css.main}>
			

			<ul>
			<ReactSwipe
		       className="carousel"
		       swipeOptions={{ continuous: true,auto:2000 }}
		       key={this.state.swiperDatalist.length}
		     >
			     	 {this.state.swiperDatalist.map(item=>
						<li key={this.state.a++}>
							<img  src={item.cover} alt="" />
						</li>
			      	)}
			</ReactSwipe>
			</ul>

			<p className={css.good}>
				<span className={css.first}>丨</span>
				<span className={css.second}>推荐作品</span>
			</p>

			<div>
				{
					this.state.datalist.map(item=>
							<p key={this.state.a++}>
								{item.title}
							</p>
						)
				}
			</div>

		</div>
	}

	componentWillMount(){
		axios.get('/Api/Base/SliderBannel').then((res)=>{
			this.setState({
				swiperDatalist:res.data.Data,
				src:res.data.Data[0].cover
			})
		}).catch((err)=>{
			console.log(err);
		})

		/*axios.get('/API/Works?recommend=2&page=1&pageSize=12').then((res)=>{
			console.log('res',res.data);
			this.setState({
				datalist:res.data
			})
		}).catch((err)=>{
			console.log(err);
		})*/
	}
	
}

export default Home