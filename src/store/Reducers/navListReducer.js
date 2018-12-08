//作品里面一堆表格的显示和隐藏

const navListReducer = (prevState=true,action={})=>{
	let {type,payload} = action;
	switch(type){
		case 'navList':
		return payload;
		default :
		return prevState;
	}
}

export default navListReducer;