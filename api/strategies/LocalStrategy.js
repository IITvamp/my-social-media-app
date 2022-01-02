const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

//Called during login/sign up.
passport.use(new LocalStrategy("local",User.authenticate()));

// passport.use(
//   new LocalStrategy("local", function (
//     username,
//     password,
//     done
//   ) {
//     console.log("Local Strategy");
//     console.log(username);
//     User.findOne({ username: username }, function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false);
//       }
//       if (!user.verifyPassword(password)) {
//         return done(null, false);
//       }
//       return done(null, user);
//     });
//   })
// );

//called while after logging in / signing up to set user details in req.user
passport.serializeUser(User.serializeUser());
