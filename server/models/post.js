const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  body: String,
  username: String,
  timeStamp: String,
  comments: [
    {
      body: String,
      username: String,
      timeStamp: String,
    },
  ],
  likes: [
    {
      username: String,
      timeStamp: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Post", postSchema);
