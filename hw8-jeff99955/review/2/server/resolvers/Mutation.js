const Message = require('../models/message')

const Mutation = {
    async addMessage(parent, { from, to, body }, { db, pubsub }, info) {
        const message = new Message({ from, to, body });
        await message.save();
        pubsub.publish(from, {
            message: {
                mutation: 'CREATED',
                data: message
            }
        })
        pubsub.publish(to, {
            message: {
                mutation: 'CREATED',
                data: message
            }
        })
        return message;
    },
    // async deleteMessage(parent, { from, to, body }, { db, pubsub }, info) {
    //     const mes = Message.find({ $or: [{ from: from }, { to: to }] }).limit(100).sort({ _id: 1 }).exec();
    //     await Message.deleteMany({ $or: [{ from: from }, { to: to }] }, () => {})
    //     pubsub.publish(from, {
    //         message: {
    //             mutation: 'DELETED',
    //             data: mes
    //         }
    //     })
    //     pubsub.publish(to, {
    //         message: {
    //             mutation: 'DELETED',
    //             data: mes
    //         }
    //     })
    //     return "done"
    // },
    deleteAllMessage: async() => {
        await Message.deleteMany({}, () => {
            // sendData(['cleared'])

            // sendStatus({
            //   type: 'info',
            //   msg: 'Message cache cleared.'
            // })

        })
        return "done"
    }
}

module.exports = Mutation