const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const MessageSchema = new Schema({
	from: {
		type: String,
		required: [true, 'from field is required.']
	},
	to: {
		type: String,
		required: [true, 'to field is required.']
	},
	body: {
		type: String,
		required: [true, 'Body field is required.']
	}
})

// Creating a table within database with the defined schema
const Message = mongoose.model('message', MessageSchema)

// Exporting table for querying and mutating
module.exports = Message
