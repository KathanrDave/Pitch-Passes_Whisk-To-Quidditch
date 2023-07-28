const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/authcontroller");
const middleware = require("../middlewares/passportmiddleware");
const isAuthenticated = require("../middlewares/authcheck");
const passport = require("passport");

// Handle POST request for
// User sign up
router.post("/signup", authcontroller.Signup);
// User sign in
router.post("/signin", authcontroller.Signin);
// User admin in
router.post("/signin/admin", authcontroller.adminSignin);
// admin register
router.post("/register/admin", authcontroller.adminRegister);

// Use Passport.js middleware for protected routes
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // This route will be protected and can only be accessed by authenticated users
    // The authenticated user's information can be accessed through req.user
    res.json({ user: req.user });
  }
);
// Route for initiating Google OAuth authentication
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "consent",
  })
);

// Callback route for handling the Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/user",
    failureRedirect: "http://localhost:3000/auth/signup", // Replace with the URL to redirect after failed sign-in
  }),
  (req, res) => {
    // Handle successful Google sign-in
    res.json({ success: true });
  }
);

// Logout
router.get("/logout", authcontroller.logout);

// // Protected route that requires authentication
// router.get("/protected", isAuthenticated, (req, res) => {
//   // The `req.user` object will be available if the user is authenticated via Google or email/password
//   if (req.user) {
//     // User is authenticated
//     // You can perform additional actions or logic for authenticated users here
//     res.json({ message: "Authenticated user", user: req.user });
//   } else {
//     // User is not authenticated
//     res.json({ message: "Unauthenticated user" });
//   }
// });

module.exports = router;
