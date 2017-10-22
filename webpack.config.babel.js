import webpack from 'webpack';
import fs from 'fs';
import path from 'path';
import colors from 'colors';
import autoprefixer from 'autoprefixer';
import globalImport from 'postcss-global-import';
import * as options from './webpack.options';

const ENV = process.env.ENV || 'development';
const devEnv = ENV !== 'production';

export default {
	devtool: 'source-map', //'cheap-module-eval-source-map',
	context: path.resolve(__dirname, 'src'),
	entry: (devEnv ? [
			'webpack-hot-middleware/client?reload=true' //note that it reloads the page if hot module reloading fails.
		] : []).concat([
			'./index.js'
		]),
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: `/`,
		filename: `bundle.js`
	},
	resolve: {
		modules: [
			path.resolve(__dirname, 'node_modules'),
			'node_modules'
		],
		extensions: ['.jsx', '.js', '.json']
	},
	devServer: { //This is where our code is.
		contentBase: './src'
	},
	plugins: ([
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.ENV': JSON.stringify(ENV)
		})
	]).concat(devEnv ? [
		new webpack.HotModuleReplacementPlugin(),
	] : ([
			new webpack.optimize.OccurrenceOrderPlugin(),
		]).concat(debug ? [] : [
			new webpack.optimize.UglifyJsPlugin(options.UglifyJs)
		])
	),
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.(styl|css)$/,
				use: [
					{ loader: "style-loader" },
					{
						loader: 'css-loader',
						options: {
							sourceMap: devEnv,
							...(devEnv ? {} : { minimize: true }) 
						}
					},
					{
						loader: `postcss-loader`,
						options: {
							sourceMap: devEnv,
							plugins: () => {
								autoprefixer({ browsers: [ 'defaults' ] });
							}
						}
					},
					{
						loader: 'stylus-loader',
						options: { sourceMap: devEnv }
					}
				]
			},
			{
				test: /\.(xml|html|txt|md)$/,
				use: 'raw-loader'
			},
			{
				test: /\.(png|jpg|jpeg)$/,
				use: 'base64-image-loader'
			}
		]
	}
};
