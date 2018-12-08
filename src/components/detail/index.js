import React from 'react' ;
import css from './index.module.scss';
import axios from 'axios';
import Footer from '../Footer';
import store from "../../store";

class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state={
        	data:'',
        	imgList:[],
        	userId:'',
        	userOtherWorksList:[],
        	messageShow:false,
        	messageValue:'',
        	messageList:[''],
        	newdata:['']
        }
    }

	render(){
		return <div className={css.main}>
			{
				this.state.data?
				<div>
					<div className={css.user}>
						<img src={this.state.data.userView.UserHead} alt=""/>

						<div className={css.userInfo}>
							<p>{this.state.data.userView.NickName}</p>
							<p>{this.state.data.userView.AddressNow.CityName}</p>
						</div>
						<img src="imgs/add.gif" alt=""/>
					</div>

					<div className={css.title}>
						<p className={css.titleName}>{this.state.data.title}</p>
						<p>
							<span className={css.ownWorks}>原创-平面</span>
							<span className={css.time}>{this.state.data.timeAdd.slice(0,10)}</span>
							<i className="iconfont icon-faxian"></i>
							<span>{this.state.data.data.readCount}</span>
							<i className="iconfont icon-xuanzhong"></i>
							<span>{this.state.data.data.goodCount}</span>
							<i className="iconfont icon-xuanzhong"></i>
							<span>{this.state.data.data.goodCount}</span>
						</p>
						<p className={css.line}></p>
					</div>

					{
						this.state.imgList.map((item)=>
							<img src={item.picPath} alt="" key={item.picID}/>
						)
					}

					<div className={css.banquan}>
						<p>作者版权归 <span>{this.state.data.userView.NickName}</span>,禁止匿名转载；</p>
						<p>禁止商业使用；禁止个人使用。</p>
						<p>
							<strong>重要声明：</strong>设计网为开放交流平台，不担保任何私下交易。是否使用本网站服务及资料应由用户自行考虑并自负风险。用户以自己的独立判断从事私下交易行为，将独立承担可能产生的不利后果和责任，设计网不承担任何法律责任。
						</p>
						<p className={css.line}></p>
					</div>

					<div className={css.otherWorks}>
						<p>他的作品</p>
						<div>
							{
								this.state.userOtherWorksList.map(item=>
									<img src={item.cover} alt="" key={item.worksID} onClick={this.imgClick.bind(this)}/>
									)
							}
						</div>
					</div>
					<p className={css.line}></p>

					<div className={css.pinglun}>
						<div className={css.pingluntitle}>评论 {this.state.messageList.length}</div>
						{
							this.state.messageList.map((item)=>
								<p key={item.message} className={css.content}>
									<span>{item.username}:</span><br/>
									<span className={css.cont}>{item.message}</span>
								</p>
							)
						}
						
					</div>

					<div className={css.nomore}>没有更多评论了</div>

					<Footer></Footer>

					<p className={this.state.messageShow?css.message:css.notShowMessage}>
						<input type="text" placeholder="评论" value={this.state.messageValue} onChange={this.messageChange}/>
						<span onClick={this.share.bind(this)}>分享</span>
					</p>

					<div className={css.foot}>
						<div>
							<i className="iconfont icon-wodefankui"></i>
							<p onClick={this.saveMessageReducer.bind(this)}>评论</p>
						</div>
						<div>
							<i className="iconfont icon-cainixihuan"></i>
							<p>点赞</p>
						</div>
						<div>
							<i className="iconfont icon-shoucang"></i>
							<p>收藏</p>
						</div>
						<div>
							<i className="iconfont icon-fenxiang"></i>
							<p>分享</p>
						</div>
					</div>

				</div>
				:null
			}
			
		</div>
	}

	componentWillMount(){

		store.dispatch({
			type:'nav',
			payload:false
		})

		axios.get(`/API/Works?id=${this.props.match.params.id}&isConfirm=false`).then((res)=>{
            //console.log('detail',res.data.Data);
            this.setState({
            	data:res.data.Data,
            	imgList:res.data.Data.pics,
            	userId:res.data.Data.userID
            })
            //console.log('userid',this.state.data.userID);

            axios.get(`/API/UserWorks?userID=${this.state.data.userID}&cate&page=1&pageSize=3`).then((res)=>{
				//console.log('picuserdata',res.data);
				this.setState({
					userOtherWorksList:res.data
				})
			}).catch((err)=>{
				console.log(err);
			})
		}).catch((err)=>{
			console.log(err);
		})


		axios.post('/ddd/getMessage',{
			workId:`${this.props.match.params.id}`
		}).then((res)=>{
			console.log('getMesage',res.data);
			this.setState({
				messageList:res.data
			})
		})

		store.subscribe(()=>{
			this.setState({
				messageShow:store.getState().messageReducer
			})
		})
	}


	saveMessageReducer(){
		//console.log('click');
		store.dispatch({
			type:'message',
			payload:!store.getState().messageReducer
		})
	}
	messageChange=(evt)=>{
		//console.log('change',evt.target.value);
		this.setState({
			messageValue:evt.target.value
		})
	}
	share(){
		// console.log('share',this.state.messageValue);
		var name = decodeURIComponent(document.cookie);
		var array = name.split('; ');
		var array_value =  array[0].split('=');
		var user = array_value[1];
		console.log(user);
		if(user){
			console.log('not null',user);
			axios.post('/ddd/saveMessage',{
				username:user,
				workId:`${this.props.match.params.id}`,
				message:this.state.messageValue
			}).then((res)=>{
				console.log('message',res.data);
			})
		} else {
			console.log('null');
			this.props.history.push('/login');
		}
		

		axios.post('/ddd/getMessage',{
			workId:`${this.props.match.params.id}`
		}).then((res)=>{
			console.log('getMesageshare',res.data);
			this.setState({
				messageList:res.data
			})
		})
	}

	/*componentWillUnmount(){
		store.dispatch({
			type:'nav',
			payload:true
		})
	}*/

	imgClick(){
		console.log('cick');
		//this.props.history.push(`detail/${this.props.match.params.id}`);
		
	}
}

export default Detail