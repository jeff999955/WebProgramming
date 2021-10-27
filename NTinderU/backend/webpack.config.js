const path = require("path");
require("dotenv-defaults").config();
const NodemonPlugin = require("nodemon-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
	mode: process.env.NODE_ENV || "production",
	target: "node",
	entry: { app: ["./src/index.js"] },
	output: {
		path: path.resolve(__dirname, "./build"),
		filename: "index.js",
	},
	module: {
		rules: [
			{ test: /\.(graphql|gql)$/, exclude: /node_modules/, loader: "graphql-tag/loader" },
		],
	},
	stats: "errors-only",
	externals: [nodeExternals()],
	plugins: [new NodemonPlugin({ watch: path.resolve("./build") })],
};
