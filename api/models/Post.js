const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      max: 20,
      default: "",
    },
    desc: {
      type: String,
      max: 100,
    },
    img: {
      type: String,
    },
    url: {
      type: String,
      default: "http://localhost:3000/",
    },
    tags: {
      type: [String],
      default:"",
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
