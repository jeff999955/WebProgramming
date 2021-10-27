import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import { GraphQLServer, PubSub } from 'graphql-yoga'

const mongoose = require('mongoose')
const Message = require('./models/message')

require('dotenv-defaults').config()

if (!process.env.MONGO_URL) {
    console.error('Missing MONGO_URL!!!')
    process.exit(1)
}

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const mongoose_db = mongoose.connection

mongoose_db.on('error', (error) => {
    console.error(error)
})

mongoose_db.once('open', () => {
    console.log('MongoDB connected!')

    const db = { Message }

    const pubsub = new PubSub()

    const server = new GraphQLServer({ 
        typeDefs: './server/schema.graphql', 
        resolvers: {
            Query,
            Mutation,
            Subscription
        },
        context: {
            db, 
            pubsub
        }
    })

    server.start(() => console.log('Server is running on localhost:4000'))

})
