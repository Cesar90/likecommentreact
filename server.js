const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('DB connected!'))
  .catch((err) => console.error(err))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server listening on ${url}`)
})
