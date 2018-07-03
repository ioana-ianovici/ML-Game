// webpack v4
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {main: './src/index.js'},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name][hash].js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {}
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin('dist', {}),
		new MiniCssExtractPlugin({
			filename: 'style.[contenthash].css'
		}),
		new HtmlWebpackPlugin({
			inject: false,
			hash: true,
			template: './src/index.html',
			filename: 'index.html'
		}),
		new CspHtmlWebpackPlugin(),
		new WebpackMd5Hash()
	]
};