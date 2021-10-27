const Subscription = {
	chatRoom: {
		subscribe(parent, args, { db, pubsub }, info) {
			console.log(`Subscibed! => chatRoom: ${args.user}`)
			return pubsub.asyncIterator(`chatRoom: ${args.user}`)
		}
	}
}

export default Subscription