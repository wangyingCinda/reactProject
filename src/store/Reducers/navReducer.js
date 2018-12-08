//显示隐藏nav

//控制头部的显示隐藏
const navReducer = (prevState=true,action={})=>{

	let {type,payload} = action;
	switch(type){
		case "nav":
		return payload;
		default :
		return prevState;
	}
}

export default navReducer;
