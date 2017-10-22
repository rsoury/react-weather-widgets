import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function widgetsReducer(state=initialState.widgets, action){
	switch(action.type){
		default: {
			return state;
		}
	}
}