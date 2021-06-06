const { AuthenticationError, UserInputError } = require("apollo-server");

const User = require("../../models/user");
const Post = require("../../models/post");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Mutation: {
    /** Post Mutations */

    async createPost(_, { body }, context, __) {
      // checkAuth will handle verification,
      // and will throw errors if token is expired etc...
      // if token is valid will return a user

      const user = checkAuth(context);
      // simple validation for post body, throw an error if
      // body is an empty string

      if (body.trim() === "") {
        throw new UserInputError("Empty post", {
          errors: {
            body: "Post body must not be empty",
          },
        });
      }

      // the new post is created with body, and the other
      // relevant info comes from the user info from checkAuth

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        timeStamp: new Date().toISOString(),
      });

      const post = await newPost.save();

      const CurrentUser = await User.findById( user.id);
      // add the postId to the list of postId's in the user collection
      // and save
      CurrentUser.posts.push(post._id);
      await CurrentUser.save();

      return post;
    },
    // delete a post
    async deletePost(_, { postId }, context, __) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          post.delete();
          return "Post has been deleted!";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Query: {
    /** Post Queries */
    // Queries for individual or multiple posts

    async getPost(_, { postId }, context, __) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPosts() {
      try {
        const posts = await Post.find().sort({ timeStamp: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
/**needs an update post */
