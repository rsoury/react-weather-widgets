import express from 'express'; 
import webpack from 'webpack';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import routes from './routes';

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
	app.use(require('webpack-dev-middleware')(compiler, {
	  noInfo: true,
	  publicPath: config.output.publicPath
	}));

	app.use(require('webpack-hot-middleware')(compiler));
}

routes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
	opbeat.captureError(err);
	res.status(err.status || 500);
	res.json(
		test ? {
			object: "error",
			type: err.status,
			message: err.message,
			trace: err
		} : {
			object: "error",
			type: err.status,
			message: err.message
		}
		);
});

app.listen(port, () => {
	console.log(`We are live on ${port}`.green);
});

export default app;