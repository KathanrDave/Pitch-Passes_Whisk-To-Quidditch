const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/authcontroller");
const passport = require("passport");

// Handle POST request for user registration
router.post("/signup", authcontroller.Signup);
router.post("/signin", authcontroller.Signin);

// auth logout
router.get("/logout", (req, res) => {
  // handle with passport
  res.send("logging out");
});

// auth with google+
router.get(
  "/google/signup",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// callback route for google to redirect to
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.send("you are signuped with google");
});

module.exports = router;
