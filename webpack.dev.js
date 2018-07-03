// webpack v4 production config
const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		open: true
	}
});
