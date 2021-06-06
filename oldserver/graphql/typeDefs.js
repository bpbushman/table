const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    timeStamp: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
  }
  type Comment {
    id: ID!
    timeStamp: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    timeStamp: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    username: String!
    token: String!
    timeStamp: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]!
    getPost(postId: ID!): Post
    getTimelinePosts: [Post]!
    getUsers: [User]!
    getFollowedUsers: [User]!

  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    followUser(userId: ID!, username: String!): String!
    unFollowUser(userId: ID!): String!
  }
`;
