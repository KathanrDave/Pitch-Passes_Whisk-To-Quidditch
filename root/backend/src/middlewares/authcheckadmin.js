const jwt = require("jsonwebtoken");

const authCheck = (req, res, next) => {
  const token = req.cookies.jwtToken; // Get the JWT token from the 'jwtToken' cookie
  console.log("token at the authchec"+token);
  if (!token) {
    // If the token is not present in the cookie, the admin is not authenticated
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify and decode the token using the secret key
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("djkfg"+decodedToken);

    // The decodedToken will contain the admin data (e.g., id, email) from the JWT payload
    req.admin = decodedToken.admin; // Set the admin data in req.admin for use in subsequent routes
 // Set the admin data in req.admin for use in subsequent routes
    next(); // Call the next middleware or route handler
  } catch (err) {
    // If the token is invalid or expire    d, return an error
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authCheck;
