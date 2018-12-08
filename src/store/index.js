import {createStore,combineReducers} from 'redux';
import navListReducer from './Reducers/navListReducer.js';
import headReducer from './Reducers/headReducer.js';
import registerReducer from './Reducers/RegisterReducer.js'	;
import messageReducer from './Reducers/messageReducer.js';
import nav from './Reducers/navReducer.js';

const reducer = combineReducers({
	navListReducer,
	headReducer,
	registerReducer,
	messageReducer,
	nav
})

const store = createStore(reducer);

export default store;