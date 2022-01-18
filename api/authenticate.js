const passport = require("passport");
const jwt = require("jsonwebtoken");
const dev = process.env.NODE_ENV !== "production";

exports.COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  signed: true,
  maxAge: 60 * 60 * 24 * 30*1000,
  sameSite: "none",
};

exports.getToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET);
};

exports.verifyUser = passport.authenticate("jwt", { session: false });
