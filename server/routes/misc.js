export default function(app){
	app.get('/ping', (req, res, next) => {
		res.end('Pong!');
	});
}