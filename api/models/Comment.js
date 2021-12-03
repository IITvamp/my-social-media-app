const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      max: 100,
    },
    responseTo: {
      type: String,
    },
    upVotes: {
      type: Array,
      default: [],
    },
    downVotes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
