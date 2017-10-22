import request from 'superagent';

class CountryApi{
	static getCities(country){
		return new Promise((resolve, reject) => {
			request
				.get('/cities')
				.query(country)
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
export default CountryApi;