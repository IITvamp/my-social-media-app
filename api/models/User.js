"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.models = {};
mongoose.modelSchemas = {};

const passportLocalMongoose = require("passport-local-mongoose");

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

const User = new Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    firstname: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      require: true,
    },
    authStrategy: {
      type: String,
      default: "local",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
);

// User.set("toJSON", {
//   transform: function (doc, ret, options) {
//     delete ret.refreshToken;
//     return ret;
//   },
// });

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
