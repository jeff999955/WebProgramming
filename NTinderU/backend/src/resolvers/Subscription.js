const Subscription = {
	message: {
		subscribe(parent, { username }, { pubsub }) {
			return pubsub.asyncIterator(`message about ${username}`);
		},
	},
	like: {
		subscribe(parent, { username }, { pubsub }) {
			return pubsub.asyncIterator(`like ${username}`);
		},
	},
	match: {
		subscribe(parent, { username }, { pubsub }) {
			return pubsub.asyncIterator(`match with ${username}`);
		},
	},
};

export default Subscription;
