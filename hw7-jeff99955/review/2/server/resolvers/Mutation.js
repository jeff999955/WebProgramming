const Mutation = {
  async createMessage(parent, { message }, { pubsub, Message }, info) {

    const chat = new Message(message)
    await chat.save()

    pubsub.publish('message', {
      message: {
        mutation: 'CREATED',
        message: message
      }
    })

    return message
  },
  async deleteMessage(parent, { name }, { pubsub, Message }, info) {

    const res = await Message.deleteOne({name: name})

    if(res.deletedCount){
      pubsub.publish('message', {
        message: {
          mutation: 'DELETED'
        }
      })
      return true
    }
    else{
      return false
    }
  },
}

export default Mutation
