// webpack v4
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {main: './src/index.js'},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name][chunkhash].js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract(
						{
							fallback: 'style-loader',
							use: ['css-loader']
						})
			}]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'style.[chunkhash].css',
			disable: false,
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			inject: false,
			hash: true,
			template: './src/index.html',
			filename: 'index.html'
		})
	]
};