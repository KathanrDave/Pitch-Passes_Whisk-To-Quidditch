// // const { compareSync } = require("bcrypt");
// // const UserModel = require("./database");

// require("dotenv").config();
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const session = require("express-session");
// const app = express();
// const express = require("express");



// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGO_URI,
//       collectionName: "sessions",
//     }),
//     cookie: { maxAge: 1000 * 60 * 60 * 24 },
//   })
// );


// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.CALLBACK_URL,
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       console.log(accessToken, profile);

//       UserModel.findOne({ googleId: profile.id }, function (err, user) {
//         if (err) {
//           return cb(err);
//         }
//         if (!user) {
//           let newUser = new UserModel({
//             name: profile.displayName,
//             googleId: profile.id,
//           });
//           newUser.save();
//           return cb(null, newUser);
//         }
//         return cb(null, user);
//       });
//     }
//   )
// );

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   UserModel.findById(id, function (err, user) {
//     done(err, user);
//   });
// });