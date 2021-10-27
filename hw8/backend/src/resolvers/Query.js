import Message from "../../models/message"

const Query = {
  messages: async (parent, args) => {
    if(!args.username)
      return await Message.find({})
    return await Message.find({}).or([{to: args.username}, {from: args.username}])
  }
}

export { Query as default }
