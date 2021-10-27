const Mutation = {
	async createPost(parent, args, { Message }, info) {
		const post = {
			body: args.data.body,
			name: args.data.name
		}
		await Message.create(post)
		pubsub.publish('post', {
			post: {
				mutation: 'CREATED',
				data: post
			}
		})
		return post
	},
	async deleteAllPosts(parent, args, { Message }, info) {
		await Message.deleteMany({})
		const state = "Finished !"
		return state
	}
}

module.exports = Mutation