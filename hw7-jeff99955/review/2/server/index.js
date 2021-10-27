import 'dotenv-defaults/config.js'

import express from 'express'
import mongoose from 'mongoose'
import WebSocket from 'ws'
import { GraphQLServer, PubSub } from 'graphql-yoga'

import  Message from './models/message.js'

import Query from './resolvers/Query.js'
import Mutation from './resolvers/Mutation.js'
import Subscription from './resolvers/Subscription.js'

const app = express()

const pubsub = new PubSub()
const server = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
  },
  context: {
    pubsub,
    Message
  }
})

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error) => {
  console.error(error)
})

db.once('open', () => {
  console.log('MongoDB connected!')

  const PORT = process.env.port || 4000

  server.start(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
  })
})
