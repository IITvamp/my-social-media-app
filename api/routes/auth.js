const router = require("express").Router();
// const User = require("../models/User");
const mongoose = require('mongoose');
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = mongoose.model('User');
const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
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
          const refreshToken = getRefreshToken({ _id: user._id });
          user.refreshToken.push({ refreshToken });
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500;
              res.send(err);
            } else {
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
              res.send({ success: true, token });
            }
          });
        }
      }
    );
  }
});


router.post("/login", passport.authenticate("local"), (req, res, next) => {
  const token = getToken({ _id: req.user._id });
  // console.log(req.user);
  const refreshToken = getRefreshToken({ _id: req.user._id });
  User.findById(req.user._id).then(
    (user) => {
      user.refreshToken.push({ refreshToken });
      user.save((err, user) => {
        if (err) {
          // res.status(500).json(err);
          // res.statusCode = 500;
          res.status(500).send(err);
        } else {
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
          // res.status(200).json(token);
          res.status(200).send({ success: true, token, refreshToken });
        }
      });
    },
    (err) => next(err)
  );
});

router.get("/gogglelogin", passport.authenticate("google"), (req, res) => {
  console.log("redirected", req.user);
  let user = {
    displayName: req.user.displayName,
    name: req.user.name.givenName,
    email: req.user._json.email,
    provider: req.user.provider,
  };
  console.log(user);

  FindOrCreate(user);
  let token = jwt.sign(
    {
      data: user,
    },
    "secret",
    { expiresIn: "1h" }
  );
  res.cookie("jwt", token);
  res.redirect("/");
});


router.post("/refreshToken",async (req, res, next) => {
  // console.log(req);
  const { signedCookies = {} } = req;
  // const { refreshToken } = signedCookies;
  const refreshToken = signedCookies.refreshToken;
  console.log(signedCookies.refreshToken);

  if (refreshToken) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const userId = payload._id;
      User.findOne({ _id: userId }).then(
        (user) => {
          // console.log(user);

          if (user) {
            // Find the refresh token against the user record in database
            const tokenIndex = user.refreshToken.findIndex(
              (item) => item.refreshToken === refreshToken
            );
            console.log(tokenIndex);
            if (tokenIndex === -1) {
              res.status(401).send("Unauthorized");
            } else {
              const token = getToken({ _id: userId });

              const newRefreshToken = getRefreshToken({ _id: userId });
              console.log(newRefreshToken);
              var myRefreshToken = { refreshToken: newRefreshToken }
              user.refreshToken.filter((token) => token !== refreshToken);
              user.refreshToken.push(newRefreshToken);
              // user.refreshToken[tokenIndex] = myRefreshToken;

              // console.log(user.refreshToken);
              user.save()
                .then(user => {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                  res.send({ success: true, token, newRefreshToken, user });
                })
                .catch(err =>  res.status(500).send(err))
                
            }
          } else {
            res.statusCode = 402;
            res.send("Unauthorized");
          }
        },
        (err) => next(err)
      );
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
  const { refreshToken } = signedCookies;
  User.findById(req.user._id).then(
    (user) => {
      const tokenIndex = user.refreshToken.findIndex(
        (item) => item.refreshToken === refreshToken
      );

      if (tokenIndex !== -1) {
        (user.refreshToken).splice(tokenIndex, 1);
      }

      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.clearCookie("refreshToken", COOKIE_OPTIONS);
          res.send({ success: true });
        }
      });
    },
    (err) => next(err)
  );
});

router.post('/adduser', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (user) {
      res.status(200).json(user);
      return;
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
