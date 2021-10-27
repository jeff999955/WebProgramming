const Mutation = {
	async insertMessage(parent, args, { db, pubsub }, info) {
		const newMessage = await db.Message.create(args.newMessage)
		pubsub.publish(`chatRoom: ${newMessage.sender}`, {
			chatRoom: {
				mutation: "SEND",
				data: newMessage
			}
		})
		pubsub.publish(`chatRoom: ${newMessage.receiver}`, {
			chatRoom: {
				mutation: "RECEIVE",
				data: newMessage
			}
		})
		return newMessage
	},
	async clearAll(parent, args, { db, pubsub }, info) {
		const messageToClear = await db.Message.find({})
		await db.Message.deleteMany({})

		return messageToClear
	}
}

export default Mutation