const express = require("express");
const router = express.Router();
const admin = require("../controllers/matchcontroller");

router.post("/addeventdetails", admin.Addeventdetails);

router.get("/extractdetails", admin.Extractdetails);
module.exports = router;
