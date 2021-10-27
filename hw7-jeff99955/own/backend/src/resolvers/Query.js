import Message from "../../models/message"

const Query = {
  messages: () => Message.find({})
}

export { Query as default }
