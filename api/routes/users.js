const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
  verifyUser,
} = require("../authenticate");

router.get("/me", verifyUser, (req, res, next) => {
  res.send(req.user);
});

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err.message);
  }
});




module.exports = router;
