const path = require('path');

// https://stackoverflow.com/a/60029923
module.exports = {
	entry: [
		__dirname + '/src/script.js',
		__dirname + '/src/blue.scss',
		__dirname + '/src/cyan.scss',
		__dirname + '/src/indigo.scss',
		__dirname + '/src/orange.scss',
		__dirname + '/src/red.scss',
		__dirname + '/src/teal.scss',
		__dirname + '/src/yellow.scss',
	],
	output: {
		path: path.resolve(__dirname),
		filename: 'script.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						"presets": [
							"@babel/preset-env",
							"@babel/preset-react"
						]
					},
				},
			}, {
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
						options: { outputPath: '/', name: '[name].css'}
					},
					'sass-loader'
				]
			}
		]
	}
};