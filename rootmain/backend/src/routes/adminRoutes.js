const express = require("express");
const router = express.Router();
const admin = require("../controllers/matchcontroller");

//match related 
router.post("/addeventdetails", admin.Addeventdetails);
router.get("/extractdetails", admin.Extractdetails);

// add seats functionality
router.post("/addseats/createseats", admin.createseats);
router.get("/addseats/checkseats", admin.checkseats);
router.put("/addseats/setunavailable", admin.setunavailable);

module.exports = router;
