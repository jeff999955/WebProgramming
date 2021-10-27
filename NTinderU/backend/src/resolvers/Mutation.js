const Mutation = {
	createUser: async (parent, { data }, { User }) => {
		let user = await User.findOne(data);
		if (!user) {
			data.liked = [];
			data.matched = [];
			data.rooms = [];
			data.photo = data.photo || "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg";
			user = new User(data);
			await user.save();
			return user;
		} else return null;
	},
	deleteUser: async (parent, { data }, { User }) => {
		const user = await User.findOne(data);
		if (user) await User.deleteOne(data);
		return user;
	},
	addLikedUser: async (parent, { data: { username, target } }, { User, pubsub }) => {
		await User.updateOne(
			{ username: username }, // update Target
			{ $addToSet: { liked: target } },
			(err) => {
				if (err) console.error(err);
				pubsub.publish(`like ${target}`, {
					like: { data: `${username} likes you.` },
				});
				console.log(`${username} likes ${target}`);
			}
		);
		const updated = await User.findOne({ username: username });

		return updated;
	},
	addMatchedUser: async (parent, { data: { username, target } }, { User, pubsub }) => {
		await User.updateOne({username:username}, { $addToSet: { matched: target } }, (err) => {
			if (err) console.error(err);
		});
		await User.updateOne({username:target}, {$addToSet: {matched: username}}, (err) => {if(err)console.error(err)})
		const updated = await User.findOne({ username: username });
		return updated;
	},
	createChatroom: async (parent, { data }, { User, Chatroom , pubsub}) => {
		let room = new Chatroom(data);
		let un1 = data.users[0],
			un2 = data.users[1];
		let u1 = await User.findOne({ username: un1 }),
			u2 = await User.findOne({ username: un2 });
		if (!u1 || !u2) return null;
		if (u1.rooms.get(un2) && u2.rooms.get(un1)) {
			room._id = u1.rooms.get(un2);
			return room;
		}
		await room.save();
		await u1.rooms.set(un2, room._id);
		await u2.rooms.set(un1, room._id);
		await u1.save();
		await u2.save();
		console.log(room)
		pubsub.publish(`match with ${un1}`,{
			match:{
				mutation: "CREATED",
				data:{
					target: un2,
					roomID: room.id
				}
			}
		})
		pubsub.publish(`match with ${un2}`,{
			match:{
				mutation: "CREATED",
				data:{
					target: un1,
					roomID: room.id
				}
			}
		})
		return room;
	},
	createMessage: async (parent, { id, data }, { Chatroom, pubsub }) => {
		let room = await Chatroom.findOne({ _id: id });
		if (!room) return null;
		data.timestamp = Date.now();
		// to obtain human readable format
		await room.updateOne({ $push: { messages: data } });
		await room.save();
		pubsub.publish(`message about ${data.to}`, {
			message: { mutation: "CREATED", data: data },
		});
		pubsub.publish(`message about ${data.from}`, {
			message: { mutation: "CREATED", data: data },
		});
		return data;
	},
};

export default Mutation;
