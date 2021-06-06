const { UserInputError } = require("apollo-server");

const Following = require("../../models/follow");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getFollowedUsers(_, __, context, ___) {
      const currentUser = checkAuth(context);
      const followingList = await Following.findOne({
        userId: currentUser.id,
      }).populate({ path: "following" });
      return followingList.following;
    },
  },
  Mutation: {
    async followUser(_, { userId, username }, context, __) {
      //validate currentUser using checkAuth

      const currentUser = checkAuth(context);

      // load the currentUser's following list, and load the user to be followed,
      // userToBeFollowed will give the currentUser access to their posts to be included
      // in currentsUsers news feed

      const followingList = await Following.findOne({ userId: currentUser.id });
      //const userToBeFollowed = await User.findById(userId);

      // check if currentUser is in the followings collection
      if (followingList) {
        // once we have currentUsers following list, make sure currentUser
        // isn't already following user
        const friendCheck = followingList.following.find(
          (friendId) => friendId == userId
        );
        if (friendCheck) {
          // if friendship already exists throw error
          throw new UserInputError(`You are already following ${username}`);
        }
        // if friendCheck is undefined, then currentUser is not following user
        // and user can then be added to currentUsers following list
        followingList.following.push(userId);
        // save the list in Mongo
        await followingList.save();

        return `You are now following ${username}`;
      }
      // this error shouldn't be thrown but is here just in case
      throw new UserInputError("There is no follower list in db");
    },

    async unFollowUser(_, { userId }, context, __) {
      // validate currentUser using checkAuth

      const currentUser = checkAuth(context);
      // get list of followers
      const followingList = await Following.findOne({
        username: currentUser.username,
      });

      // unfollow a user by filtering them out with their userId
      followingList.following = followingList.following.filter((friendId) => {
        return friendId != userId;
      });

      // save filtered list to Mongo
      await followingList.save();
      return "unfollowed!";
    },
  },
};

/**
 * better error handling
 *  make sure user cant unfollow himself
 */
