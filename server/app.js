import express from 'express'; 
import webpack from 'webpack';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import routes from './routes';
import config from '../webpack.config.babel';

dotenv.config();

const test = process.env.ENV !== 'production';
const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

app.use(morgan('dev'));
if(!test){
	app.disable('x-powered-by');
	app.use(morgan('common', {
		stream: fs.createWriteStream('./access.log', {flags: 'a'})
	}));

//Expiry Headers
app.use((req, res, next) => {
	const maxAge = 31557600;
	if (!res.getHeader('Cache-Control')){
		res.setHeader('Cache-Control', 'public, max-age=' + (maxAge / 1000));
	}
	next();
});
}else{
	const compiler = webpack(config);

	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	}));

	app.use(require('webpack-hot-middleware')(compiler));
}

// Handle server routes
routes(app);

// Let React-router handle other routes
app.get('*', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
	console.log(`We are live on ${port} - in ${test ? 'development' : 'production'} mode`.green);
});

export default app;