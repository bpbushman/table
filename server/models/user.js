const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  timeStamp: String,
  bio: String,
  banner: String,
  interests: [String],
  posts: [
     {
      type: Schema.Types.ObjectId,
      ref: "Post"
    },
  ],
});

module.exports = model("User", userSchema);
