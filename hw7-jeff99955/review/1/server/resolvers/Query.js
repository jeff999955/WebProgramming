const Query = {
	posts(parent, args, { Message }, info) {
		if(!args.query) {
			return Message.find()
		}
		return Message.find({name: args.query})
	}
}

module.exports = Query