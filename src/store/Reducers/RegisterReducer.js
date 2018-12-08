//控制头部的显示隐藏
const registerReducer = (prevState=true,action={})=>{

	let {type,payload} = action;
	switch(type){
		case "registerHead":
		return payload;
		default :
		return prevState;
	}
}

export default registerReducer;