const express = require("express");
const router = express.Router();
const admin = require("../controllers/matchcontroller");
const isAuthenticated = require("../middlewares/authcheckadmin");

//admin
router.get("/", isAuthenticated, (req, res) => {
  // At this point, the req.user object should contain the user data from the JWT token
  console.log("Admin Data:", req.admin);

  res.json({ message: "Authenticated admin", admin: req.admin });
});

//match related
router.post("/addeventdetails", admin.Addeventdetails);
router.get("/extractdetails", admin.Extractdetails);

// add seats functionality
router.post("/addseats/createseats", admin.createseats);
router.get("/addseats/checkseats", admin.checkseats);
router.put("/addseats/setunavailable", admin.setunavailable);

// to update 
router.put("/admin/match/updaterecords" ,admin.matchupdaterecords);

module.exports = router;
