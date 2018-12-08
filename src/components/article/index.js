import React from 'react' ;
import css from './index.module.scss';
class Article extends React.Component{
	render(){
		return <div className={css.main}>
			文章
		</div>
	}
}

export default Article