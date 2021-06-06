const postResolvers = require("./posts");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");
const followerResolvers = require("./following");
const timeLineResolvers = require("./timeline");

module.exports = {
  Query: {
    ...postResolvers.Query,
    ...usersResolvers.Query,
    ...timeLineResolvers.Query,
    ...followerResolvers.Query,
  },
  Mutation: {
    ...commentsResolvers.Mutation,
    ...usersResolvers.Mutation,
    ...postResolvers.Mutation,
    ...followerResolvers.Mutation,
  },
};
