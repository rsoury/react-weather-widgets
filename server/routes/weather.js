import request from 'request';

const logger = require('tracer').console();

const getEndpoint = (lat, lng) => `https://api.darksky.net/forecast/${(process.env.DARKSKY_KEY || '')}/${lat},${lng}?units=si`;
const formatResponse = ({ currently, hourly, daily }) => {
	return { currently, hourly, daily };
};
export default function(app){
	app.get('/weather', (req, res, next) => {
		const { lat, lng } = req.query;
		const key = process.env.DARKSKY_KEY || '';
		const uri = getEndpoint(lat, lng);
		request({
			method: "GET",
			uri
		}, (error, response, body) => {
			if(error){
				logger.error(error);
				next(error);
			}else{
				if(typeof body !== 'object'){
					try{
						body = JSON.parse(body);
						res.json(formatResponse(body));
					}catch(e){
						next(e);
					}
				}else{
					const { currently, hourly, daily } = body;
					res.json(formatResponse(body));
				}
			}
		});
	});
}