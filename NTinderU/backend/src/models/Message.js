import { Schema, model } from "mongoose";

export const MessageSchema = new Schema({
	from: {
		type: String,
		required: [true, "user field is required"],
	},
	to: {
		type: String,
		required: [true, "user field is required."],
	},
	body: {
		type: String,
		required: [true, "Body field is required."],
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
});

export const Message = model("messages", MessageSchema);
