const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/authcontroller");
const middleware = require("../middlewares/passportmiddleware");
const isAuthenticated = require("../middlewares/authcheck");
const passport = require("passport");

router.get("/user", (req, res) => {
  // Since the isAuthenticated middleware already checks for authentication,
  // you can assume that the user is authenticated at this point.
  res.json({ message: "Authenticated user", user: req.user });
});
// router.get(
//   "/user",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//     prompt: "consent",
//   }),
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     // This route will be protected and can only be accessed by authenticated users
//     // The authenticated user's information can be accessed through req.user
//     res.json({ user: req.user });
//   }
// );

// Protected route that requires authentication
// router.get("/user",  (req, res) => {
//   // The `req.user` object will contain the user information if the user is authenticated via JWT or Google
//   if (req.user) {
//     // User is authenticated, you can access user details and return them in the response
//     const userDetails = {
//       email: req.user.email,
//       firstName: req.user.firstName,
//       lastName: req.user.lastName,
//     };
//     res.json(userDetails);
//   } else {
//     // User is not authenticated
//     res.status(401).json({ message: "Unauthorized" });
//   }
// });

module.exports = router;
