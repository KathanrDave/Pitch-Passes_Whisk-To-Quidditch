const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const User = require("../model/user");
const passport = require("passport");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

function passportSetup(passport) {
  passport.use(
    "google",
    new GoogleStrategy(
      {
        callbackURL: "/auth/google/callback",
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      function (accessToken, refreshToken, profile, done) {
        const data = profile._json;

        User.findOne({ googleId: profile.id }).then((currentUser) => {
          if (currentUser) {
            // already have this user
            console.log("user is: ", currentUser);
            done(null, currentUser);
          } else {
            // if not, create user in our db
            new User({
              googleId: data.id,
              email: data.email,
            })
              .save()
              .then((newUser) => {
                console.log("created new user: ", newUser);
                done(null, newUser);
              });
          }
        });
      }
    )
  );
}

module.exports = passportSetup;
