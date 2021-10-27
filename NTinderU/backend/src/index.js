import dotenv_defaults from "dotenv-defaults";
import { ApolloServer, PubSub } from "apollo-server-express";
import Mongoose from "mongoose";
import express from "express";
import { createServer } from "http";
import User from "./models/User";
import { Message } from "./models/Message";
import Chatroom from "./models/Chatroom";
import schema from "./schema.graphql";
import Resolvers from "./resolvers";

dotenv_defaults.config();

if (!process.env.MONGO_URL) {
	console.error("Missing MONGO_URL.");
	process.exit(1);
}

const pubsub = new PubSub();

Mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = Mongoose.connection;

db.on("error", (error) => console.error(error));

db.once("open", () => {
	console.log("MongoDB connected.");
	const server = new ApolloServer({
		typeDefs: schema,
		resolvers: Resolvers,
		context: { User, Message, Chatroom, pubsub },
		playground: process.env.NODE_ENV === "development",
	});

	let App = express();
	server.applyMiddleware({ app: App, path: "/" });

	const PORT = process.env.PORT || 4000;

	const httpServer = createServer(App);
	server.installSubscriptionHandlers(httpServer);

	httpServer.listen(PORT, () => console.log(`server running at port ${PORT}.`));
});
