const Query = {
	async messages(parent, args, { db, pubsub }, info) {
		const ret = await db.Message.find({})
		return ret
	},
	async chatRoom(parent, args, { db, pubsub }, info) {
		const ret = await db.Message.find({$or: [{receiver: args.user}, {sender: args.user}]})
		return ret
	}
}

export default Query