//输入留言显示隐藏的输入框

const messageReducer = (prevState=false,action={})=>{
	let {type,payload} = action;
	switch(type){
		case "message":
		return payload;
		default:
		return prevState;
	}
}
export default messageReducer;