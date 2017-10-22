import jsonfile from 'jsonfile';
import path from 'path';

export default function(app){
	app.get('/cities', (req, res, next) => {
		let { country = '' } = req.query;
		if(country.length === 2){
			country = country.toUpperCase();
			jsonfile.readFile(path.join(__dirname, 'cities.json'), (err, obj) => {
				res.json(
					obj.filter(({ country: code }) => code === country)
				);
			});
		}else{
			res.end();
		}
	});
}