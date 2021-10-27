const Message = require('../models/message')

const Query = {
    // getMessage(parent, args, context, info) {
    //     if (!args.name) {
    //         return Message.find({ from: { $exists: true } }).limit(100).sort({ _id: 1 }).exec();
    //     }

    //     return Message.find({ $or: [{ from: args.name }, { to: args.name }] }).limit(100).sort({ _id: 1 }).exec();
    // }
    getMessage: async(parent, args, context, info) => {
        if (!args.name) {
            const r = await Message.find({ from: { $exists: true } }).limit(100).sort({ _id: 1 }).exec();
            return r
        }

        const r = await Message.find({ $or: [{ from: args.name }, { to: args.name }] }).limit(100).sort({ _id: 1 }).exec();
        console.log(r)
        return r
    }
}

module.exports = Query