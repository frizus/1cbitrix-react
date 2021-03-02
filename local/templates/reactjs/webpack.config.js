const path = require("path");

module.exports = {
	mode: 'production',
	entry: [
		'./src/script.js',
		'./src/blue.scss',
		'./src/cyan.scss',
		'./src/indigo.scss',
		'./src/orange.scss',
		'./src/red.scss',
		'./src/teal.scss',
		'./src/yellow.scss',
	],
	output: {
		path: path.resolve(__dirname),
		filename: "./script.js"
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].css"
						}
					},
					"sass-loader",
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/preset-env",
							"@babel/preset-react"
						]
					}
				}
			},
		]
	},
};