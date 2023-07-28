const passport = require("passport");

// Custom middleware to check if the user is authenticated through JWT or Google
const isAuthenticated = (req, res, next) => {
  // Use Passport.js to check if the user is authenticated using JWT
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (user) {
      // If the user is authenticated via JWT, attach the user to the request object
      req.user = user;

      // Continue to the next middleware
      return next();
    } else {
      // If the user is not authenticated via JWT, check if they are authenticated via Google
      passport.authenticate("google", { session: false }, (err, user, info) => {
        if (err) {
          return next(err);
        }

        if (user) {
          // If the user is authenticated via Google, attach the user to the request object
          req.user = user;

          // Continue to the next middleware
          return next();
        } else {
          // If the user is not authenticated via Google, return an error response
          return res.status(401).json({ message: "Unauthorized" });
        }
      })(req, res, next);
    }
  })(req, res, next);
};

module.exports = isAuthenticated;
