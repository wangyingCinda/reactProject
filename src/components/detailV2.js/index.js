import React, {Component} from "react";
import axios from "axios";
import css from "./index.module.scss";
import {NavLink} from "react-router-dom"
import store from "../../store";



class DetailV2 extends Component{
    constructor(props) {
      super(props);
    
      this.state = {
        data:{},
        datalist:[],
        newDatalist:[],
        visitor:null
      };
    }
    render(){
        return (
        <div className={css.container}>
            <div className={css.header}>
                <h3>{this.state.data.title}</h3>
                <div className={css.intro}>
                   
                    <span className={css.tags}>国际咨询</span>
                    <div className={css.info}>
                        
                        {/*<span>{this.state.data.startTime}</span>*/}
                        <i className="iconfont icon-wodefankui"></i>
                        <span>{this.state.data.readCount}</span>
                        <i className="iconfont icon-yanjing"></i>
                        <span>{this.state.data.replyCount}</span>
                    </div>
                </div>
            </div>
            {    this.state.datalist.map(item=>
                    <div className={css.content} dangerouslySetInnerHTML = {{__html:item.content}} key={item.contentID}></div>
                    
                )
           }

           <div className={css.newest}>
               <h6><span>最新推荐</span></h6>
               <ul >
                    {

                    this.state.newDatalist.map(item=>
                       <li key={item.info.newsID}><NavLink to={"/detail/"+item.info.newsID}>
                            <div className={css.pic}>
                           <img src={item.info.cover} alt=""/>
                                
                            </div>
                           <div className={css.content}>
                               <h5>{item.info.title}</h5>
                               <p>
                                 <i className="iconfont icon-shijian"></i>
                                 <span>{item.timeSpan}</span>
                                 <i className="iconfont icon-eye"></i>
                                 <span>{item.info.readCount}</span>
                               </p>
                               <p className={css.text}>{item.info.instruct}</p>
                           </div>
                           </NavLink>
                        </li>
                    )
               }
               </ul>
           </div>

            <div className={css.footer}>
                <div className={css.switch}>
                    
                   <span>触屏版</span>
                   |
                   <span>电脑版</span>
                   <span className={css.toTop} onClick={this.toTop.bind(this)}>回顶部</span>
                </div>
                <div className={css.copyRight}>
                    <span>Copyright© 2006 - 2017 CNDESIGN</span>
                </div>
           </div>
       
                
        </div>
        )
    }

    componentWillMount(){
      store.dispatch({
      type:'nav',
      payload:false
    })
    //http://www.cndesign.com/Api/Article?newsID=e15e10b6-ee7b-427d-86a6-a9ad00f3b10e
    console.log(this.props.location.pathname)
     let visitor = this.props.location.pathname;
    visitor = visitor.split('/')[2];
    this.setState({visitor:visitor});
     console.log(visitor)

       
    }
     toTop(){
          document.documentElement.scrollTop = 0;
    }
    componentDidMount(){
        axios.get("/Api/Article?newsID="+this.state.visitor).then(res=>{
            console.log(res.data)
            this.setState({
                data:res.data.Data,
                datalist:res.data.Data.content,
                newDatalist:res.data.Data.aboutRecommend
            })
        })
        console.log("/Api/Article?newsID="+this.state.visitor)
    }
    componentWillUnmount(){
        store.dispatch({
        type:'nav',
        payload:true
      })
    }


}

export default DetailV2