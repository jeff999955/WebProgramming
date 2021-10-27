const Subscription = {
  message: {
    subscribe(parent, args, { db, pubsub }, info) {
      return pubsub.asyncIterator('message')
    }
  },
}

export default Subscription
