import React, { Component } from 'react';
import Skycons from 'react-skycons';
import objectEmpty from '../../utils/objectEmpty';
import Spinner from '../common/Spinner';

const Widget = ({ id, city, weather = {} }) => {
	return (
		<div className="widget">
			{
				!objectEmpty(weather) ? (
					<div>
						<table>
							<tr>
								<td>
									<div className="widget-city-name">
										<strong>{city}</strong>
									</div>
									<div className="widget-humidity">
										Humidity: {weather.currently.humidity}
									</div>
									<div className="widget-pressure">
										Pressure: {weather.currently.pressure} hPa
									</div>
								</td>
								<td>
									<div className="widget-primary-icon">
										<Skycons color='black' icon={weather.currently.icon.toUpperCase().split('-').join('_')}/>
									</div>
								</td>
								<td>
									<div className="widget-primary-temp">
										{Math.round(weather.currently.temperature)}º
									</div>
								</td>
							</tr>
						</table>
					</div>
				) : (
					<Spinner />
				)
			}
		</div>
	);
}
export default Widget;