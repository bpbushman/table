const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");

//********************************************//
//** Set up mongodb connection and server ****//
//** Mongo is running on localhost 27017  ****//
//** server is on localhost 4000          ****//
//********************************************//

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect("mongodb://127.0.0.1:27017/socialDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("\nConnected to mongodb");
  });

server.listen({ port: process.env.PORT || 4000 }).then((res) => {
  console.log("\nServer running on port 4000\n");
});
