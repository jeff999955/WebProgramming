const Message = require('../models/message')

const Subscription = {
    message: {
        subscribe(parent, { name }, { db, pubsub }, info) {
            return pubsub.asyncIterator(name)
        }
    },
    delete: {
        subscribe(parent, args, { db, pubsub }, info) {
            return pubsub.asyncIterator('delete')
        }
    }
}

module.exports = Subscription