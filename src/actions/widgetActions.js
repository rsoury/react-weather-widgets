import * as types from '../constants/actionTypes';
import CountryApi from '../api/CountryApi';
import WeatherApi from '../api/WeatherApi';

export function loadWidgetWeatherSuccess(results){
	return { type: types.LOAD_WIDGET_WEATHER_SUCCESS, results };
}
export function loadWidgetCitiesSuccess(results){
	return { type: types.LOAD_WIDGET_CITIES_SUCCESS, results };
}
export function removeWidgetSuccess(key){
	return { type: types.REMOVE_WIDGET, key };
}

export function loadWidgetWeather(key, cityCoords){
	return dispatch => {
		return WeatherApi.getWeather(cityCoords)
			.then(data => {
				dispatch(loadWidgetWeatherSuccess({ key, data }));
			})
			.catch(err => {
				throw(err);
			});
	};
}

export function loadWidgetCities(key, country){
	return dispatch => {
		return CountryApi.getCities(country)
			.then(data => {
				dispatch(loadWidgetCitiesSuccess({ key, data }));
			})
			.catch(err => {
				throw(err);
			});
	};
}

export function removeWidget(key){
	return dispatch => {
		dispatch(removeWidgetSuccess(key));
	};
}