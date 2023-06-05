// import {t}

const { ApolloServer } = require("apollo-server")
const { typeDefs } = require('./schema/type-defs')
const { resolvers } = require('./schema/resolvers')

const server = new ApolloServer({
  typeDefs, resolvers, context: () => {
    return { name: "Elise" }
  }
})

// const startServer = ApolloServer.start()

server.listen().then(({ url }) => {
  console.log(`Your API is running at: ${url}`)
})


// export default server async function