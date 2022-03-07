const router = require("express").Router();
// const User = require("../models/User");
const mongoose = require('mongoose');
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = mongoose.model('User');
const {
  getToken,
  COOKIE_OPTIONS,
  verifyUser,
} = require("../authenticate");


router.post("/signup", (req, res, next) => {
  console.log("signup called");
  console.log(req.body.firstname);
  if (!req.body.firstname) {
    res.statusCode = 500;
    res.send({
      firstname: "firstnameError",
      message: "The first name is required",
    });
  } else {
    console.log(req.body.username);
    console.log(req.body.password);
    var user = new User({ username: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, email:req.body.email });
    
    User.register(user, req.body.password,
      (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          console.log(user);
          user.firstname = req.body.firstname;
          user.lastname = req.body.lastname || "";
          const token = getToken({ _id: user._id });
          res.cookie("token", token, COOKIE_OPTIONS);
          res.send({ success: true, token });
        }
      }
    );
  }
});


router.post("/login", passport.authenticate("local"), (req, res, next) => {
  try {
    const token = getToken({ _id: req.user._id });
    console.log(token, "login token")
    res.cookie("token", token, COOKIE_OPTIONS);
    res.status(200).send({ success: true, token, token });
  } catch (error) {
    res.status(400).send("some error occured");
  }
});


router.post("/refreshToken",async (req, res, next) => {
  // const { signedCookies = {} } = req;
  // const token = signedCookies.token;
  // console.log(signedCookies.token);
  // console.log(req.cookies);
  const token = req.body.token;
  if (token) {
    console.log(token)
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload);
      res.cookie("token", token, COOKIE_OPTIONS);
      res.send({ success: true, token });
    }
    catch (err) {
      res.statusCode = 401;
      res.send("Unauthorized");
    }
  }
  else {
    res.statusCode = 401;
    res.send("Unauthorized");
    
  }
});

router.get("/logout", verifyUser, (req, res, next) => {
  const { signedCookies = {} } = req;
  const { token } = signedCookies;
  if (token) {
     res.clearCookie("token", COOKIE_OPTIONS);
     res.send({ success: true });
  } else {
    res.send(401).end("unauthorised");
  }
});


module.exports = router;
