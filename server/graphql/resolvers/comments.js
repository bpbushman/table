const { UserInputError, AuthenticationError } = require("apollo-server");

const Post = require("../../models/post");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context, __) {
      // pass context into checkAuth to validate user
      // giving comment, destructure the username off of
      // the user object returned by checkAuth

      const { username } = checkAuth(context);

      // simple comment body validation will throw an
      // error if the body of the comment is empty

      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "comment body must not be empty",
          },
        });
      }

      // use postId to find the post in MongoDB

      const post = await Post.findById(postId);

      // make sure that post exists, then add comment
      // if post does not exist throw an error

      if (post) {
        post.comments.unshift({
          body,
          username,
          timeStamp: new Date().toISOString(),
        });

        await post.save();

        // returns post to graphql

        return post;
      } else throw new UserInputError("Post not found");
    },
    //** delete a comment from post  */
    async deleteComment(_, { postId, commentId }, context, __) {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex(
          (comment) => comment.id === commentId
        );
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new AuthenticationError("Post not found");
      }
    },
    //** handles liking a post and unliking */

    async likePost(_, { postId }, context, __) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // if post already liked, then unlike it by removing the like
          // from the array and returning a new array using filter

          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // if post is not previously liked, add a like by pushing a new
          // like object into the post.likes[] array

          post.likes.push({
            username,
            timeStamp: new Date().toISOString(),
          });
        }
      } else {
        // error safety net, just in case

        throw new UserInputError("Post not found");
      }
      // once the post is either liked or unliked, save the post as
      // is in MongoDB, then return the post

      await post.save();
      return post;
    },
  },
};
