const { model, Schema } = require("mongoose");

const followerSchmema = new Schema({
  username: String,
  userId: String,
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = model("Following", followerSchmema);
