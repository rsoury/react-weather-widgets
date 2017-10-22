import { combineReducers } from 'redux';
import widgets from './widgetsReducer';

const rootReducer = combineReducers({
	widgets
});

export default rootReducer;
