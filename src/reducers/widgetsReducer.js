import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function widgetsReducer(state=initialState.widgets, action){
	switch(action.type){
		case types.LOAD_WIDGET_WEATHER_SUCCESS : {
			const { key, data } = action.results;
			const newState = [...state];
			newState[key] = Object.assign({}, newState[key], { weather: data });
			return newState;
		}
		case types.LOAD_WIDGET_CITIES_SUCCESS : {
			return state;
		}
		default: {
			return state;
		}
	}
}