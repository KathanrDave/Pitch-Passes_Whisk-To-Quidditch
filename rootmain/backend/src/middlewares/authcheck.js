const passport = require("passport");
const middleware = require("../middlewares/passportmiddleware");

// Custom middleware to check if the user is authenticated through JWT or Google
const isAuthenticated = (req, res, next) => {
  // Use Passport.js to check if the user is authenticated using JWT
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      console.log("this user is error ");
      return next(err);
    }

    if (user) {
      // If the user is authenticated via JWT, attach the user to the request object
      req.user = user;
      console.log("this user is ok");

      // Continue to the next middleware
      return next();
    } else {
      console.log("google authorise");
      // If the user is not authenticated via JWT, check if they are authenticated via Google
    }
  })(req, res, next);
};

module.exports = isAuthenticated;
