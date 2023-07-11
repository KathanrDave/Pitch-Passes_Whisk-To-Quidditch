const express = require("express");
const router = express.Router();
const user = require("../controllers/user");

router.get("/completeprofile", user.UserProfile);

router.get("/admindashboard", (req, res) => {
  res.send("Welcome Admin");
});

module.exports = router;
