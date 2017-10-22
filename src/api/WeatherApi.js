import request from 'superagent';

class WeatherApi{
	static getWeather({ lat, lng }){
		return new Promise((resolve, reject) => {
			request
				.get('/weather')
				.query({ lat, lng })
				.end((err, res) => {
					if(err){
						reject(err);
					}else{
						const { text } = res;
						try{
							const json = text ? JSON.parse(text) : {};
							resolve(json);
						}catch(e){
							reject("Response not JSON");
						}
					}
				})
		})
	}
}
export default WeatherApi;