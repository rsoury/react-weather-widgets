import * as types from '../constants/actionTypes';
import CountryApi from '../api/CountryApi';
import WeatherApi from '../api/WeatherApi';

export function loadWidgetWeatherSuccess(results){
	return { type: types.LOAD_WIDGET_WEATHER_SUCCESS, results };
}
export function loadWidgetCitiesSuccess(results){
	return { type: types.LOAD_WIDGET_CITIES_SUCCESS, results };
}

export function loadWidgetWeather(cityCoords){
	return dispatch => {
		return WeatherApi.getWeather(cityCoords)
			.then(results => {
				dispatch(loadWidgetWeatherSuccess(results));
			})
			.catch(err => {
				throw(err);
			});
	}
}

export function loadWidgetCities(country){
	return dispatch => {
		return CountryApi.getCities(country)
			.then(results => {
				dispatch(loadWidgetCitiesSuccess(results));
			})
			.catch(err => {
				throw(err);
			});
	}
}