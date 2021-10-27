const Query = {
  async messages(parent, args, { Message }, info) {
    if (!args.name) {
      const allMessages = await Message.find().sort({_id: 1})
      return allMessages
    }
    else {
      const messages = await Message.find({name: args.name})
      return messages
    }
  }
}

export default Query
