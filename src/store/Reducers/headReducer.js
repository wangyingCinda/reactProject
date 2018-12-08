const headReducer = (prevState=false,action={})=>{
	let {type,payload} = action;
	switch(type){
		case 'didShow':
		return payload;
		default :
		return prevState;
	} 
}

//控制sidebar 的显示和隐藏

export default headReducer;