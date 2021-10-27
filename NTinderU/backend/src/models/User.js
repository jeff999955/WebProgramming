import { Schema, model } from "mongoose";

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, "Username field is required."],
	},
	password: {
		type: String,
		required: [true, "Password field is required."],
	},
	liked: [String],
	matched: [String],
	rooms: {
		type: Map,
		of: String,
		required: [false],
		default: [],
	},
	photo: {
		type: String,
		required: [true, "Photo is required"]
	}
});

const User = model("Users", userSchema);

export default User;
