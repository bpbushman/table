const checkAuth = require("../../util/check-auth");
const Following = require("../../models/follow");

module.exports = {
  Query: {
    async getTimelinePosts(_, __, context, ___) {
      // this query only needs the context, checkAuth will verify currentUser
      // is logged in
      const currentUser = checkAuth(context);
      // query MongoDB for currentUser's followingList then use .populate()
      //  to get each user. Each user has a reference Object.ID
      // to their posts

      const followingPosts = await Following.findOne({
        userId: currentUser.id,
      }).populate({ path: "following", populate: { path: "posts" } });
      // timeLine will hold all of the followed user's posts
      const timeLine = [];
      // once all of the posts have been populated, spread all of the posts from
      // each user into one timeLine array
      followingPosts.following.forEach((index) => {
        timeLine.push(...index.posts);
      });
      // sort list by timeStamp, newest on top
      timeLine.sort((a, b) => {
        const c = new Date(a.timeStamp);
        const d = new Date(b.timeStamp);
        return d - c;
      });

      return timeLine;
    },
  },
};
