import React, { Component } from 'react';
import Skycons from 'react-skycons';
import objectEmpty from '../../utils/objectEmpty';

const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const Widget = ({ id, city, weather = {} }) => {
	return (
		<div className="widget">
			{
				!objectEmpty(weather) ? (
					<div>
						<div className="widget-header"> 
							<div className="widget-city-name">
								<strong>{city}</strong>
							</div>
						</div>
						<div className="widget-body">
							<table>
								<tr>
									<td>
										<div className="widget-summary">
											<b>{weather.currently.summary}</b>
										</div>
										<div className="widget-humidity">
											<b>H:</b> {weather.currently.humidity}
										</div>
										<div className="widget-pressure">
											<b>P:</b> {weather.currently.pressure} hPa
										</div>
									</td>
									<td>
										<div className="widget-primary-icon">
											<Skycons color='black' icon={weather.currently.icon.toUpperCase().split('-').join('_')}/>
										</div>
									</td>
									<td>
										<div className="widget-primary-temp">
											<strong>{Math.round(weather.currently.temperature)}º</strong>
										</div>
									</td>
								</tr>
							</table>
						</div>
						<div className="widget-daily">
							<table>
								<tr>
									{
										weather.daily.data.map((day, key) => {
											const date = new Date();
											date.setTime(day.time * 1000);
											return day.time > weather.currently.time ? (
												<td key={key}>
													<div className="widget-day">
														<b>{weekdays[date.getDay()].substring(0, 3).toUpperCase()}</b>
													</div>
													<div className="widget-day-icon">
														<Skycons color='black' icon={day.icon.toUpperCase().split('-').join('_')}/>
													</div>
													<div className="widget-day-temp">
														<strong>{Math.round((day.temperatureHigh + day.temperatureLow) / 2)}º</strong>
													</div>
												</td>
											) : null;
										})
									}
								</tr>
							</table>
						</div>
					</div>
				) : (
					<div className="widget-loader">
						<div>Loading...</div>
					</div>
				)
			}
		</div>
	);
}
export default Widget;