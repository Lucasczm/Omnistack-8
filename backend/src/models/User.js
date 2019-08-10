const { Schema, model } = require("mongoose");

const Userschema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    name: { type: String, required: true },
    photo: String,
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    dislike: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true
  }
);
module.exports = model("User", Userschema);
