import { Schema, model } from "mongoose";
import { MessageSchema } from "./Message";

const chatroomSchema = new Schema({
	users: {
		type: [String],
		required: [true, "users are required"],
	},
	messages: {
		type: [MessageSchema],
		required: [false],
	},
});

const Chatroom = model("chatrooms", chatroomSchema);

export default Chatroom;
