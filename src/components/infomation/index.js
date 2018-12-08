import React, {Component} from "react";
import axios from "axios";
import css from "./index.module.scss"
import {NavLink} from "react-router-dom"


class Infomation extends Component{
    constructor(props){
        super(props);
        this.state={
            datalist:[],
            isShow:false,
            current:1
        }
    }
    render(){
        return <div className={css.information}>
 
           <ul>
                {
                    this.state.datalist.map(item=>
                        <li key={item.newsID}><NavLink to={"/detailV2/"+item.newsID}>
                            <div className={css.pic}>
                           <img src={item.cover} alt=""/>
                                
                            </div>
                           <div className={css.content}>
                               <h5>{item.title}</h5>
                               <p>
                                 <i className="iconfont icon-shijian"></i>
                                 <span>{item.timeSpan}</span>
                                 <i className="iconfont icon-eye"></i>
                                 <span>{item.readCount}</span>
                               </p>
                               <p className={css.text}>{item.instruct}</p>
                           </div>
                           </NavLink>
                        </li>
                    )
                }
              
           </ul>
           {
            this.state.isShow?<div className={css.loadMore} onClick={this.handleClick.bind(this)}>加载更多</div>:
            <div className={css.loading}>正在加载 </div>
           }
          
          
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
    }

    componentWillMount(){
        //http://www.cndesign.com/Api/Article?primaryID=3&status=3&page=1&pageSize=12
        axios.get("/Api/Article?primaryID=3&status=3&page=1&pageSize=12").then(res=>{
            console.log(res.data)
            this.setState({
                datalist:res.data,
                current:this.state.current+1,
                isShow:true
            })
        })
    }
    handleClick(){
        this.setState({
            isShow:false
        })
        axios.get("/Api/Article?primaryID=3&status=3&page="+this.state.current+"&pageSize=12").then(res=>{
            console.log(res.data)
            this.setState({
                datalist:[...this.state.datalist,...res.data],
                 current:this.state.current+1,
                 isShow:true
            })
        })
    }

    toTop(){
          document.documentElement.scrollTop = 0;
    }
}

export default Infomation;