const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");

// connection with the mongoose database
require("./googleAuth");

require("dotenv").config();
const User = require("./model/user");
const app = express();
// middleware
app.use(express.json());
app.use(cookieParser());

// Mongo Db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
// const express = require('express');
// const session = require('express-session');

// registering the user
app.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      mobileNumber,
    } = req.body;
    // All the fields are mandatory
    if (!(firstName && lastName && email && password && confirmPassword)) {
      res.status(400).send("All fields are mandatory");
    }
    // Check if the user already exists
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      res.status(401).send("User Already Exists");
    }

    const checkUser = password === confirmPassword;

    // encrypting the password
    const myEncPassword = await bcrypt.hash(password, 10);
    // encrypting the confirmPassword
    const hashedPassword = await bcrypt.hash(confirmPassword, 10);
    // check the password and confirmPassword

    // Regular expression for Indian mobile number validation
    const indianMobileNumberRegex = /^[6-9]\d{9}$/;

    // Function to validate Indian mobile number
    const checkNumber = function validateIndianMobileNumber(mobileNumber) {
      return indianMobileNumberRegex.test(mobileNumber);
    };
    // TO check the validation of the phone number
    if (!checkNumber) {
      res.status(400).send("Invalid Phone Number");
    }
    if (checkUser && checkNumber) {
      // save the user in the Database
      const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: myEncPassword,
        confirmPassword: hashedPassword,
        mobileNumber: mobileNumber,
      });
      // generating a web token
      const token = jwt.sign(
        { id: user._id, email: user._email },
        process.env.SECRET_KEY,
        { expiresIn: "2h" } // helps in generation of the unique id
      );
      //
      user.token = token;
      user.password = undefined;

      res.status(201).json(user);
    } else {
      res.status(401).send("Password and Confirm Password does not matches");
    }
  } catch (error) {
    console.log(error);
  }
});

// Function to check whether the user is admin or just user
function authorizeAdmin(req, res, next) {
  const userRole = req.body.role;
  console.log(userRole);
  let redirectUrl = "/userdashboard"; // Default redirect URL for non-admin users

  if (userRole === "admin") {
    redirectUrl = "/admindashboard"; // Redirect URL for admin users
  }

  res.redirect(redirectUrl);
}

app.post("/userdashboard", async (req, res) => {
  res.send("Welcome User");
});

app.post("/admindashboard", async (req, res) => {
  res.send("Welcome Admin");
});

app.post("/login", async (req, res) => {
  try {
    //get the data from the frontend
    const { email, password } = req.body;
    if (!email && !password) {
      res.status(400).send("All fields are Mandatory");
    }
    // check in the backend if the user exits
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      const checkUser = await bcrypt.compare(password, user.password);
      if (checkUser) {
        // generating a web token
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
          expiresIn: "2h",
        });
        user.token = token;
        user.password = undefined;
        // send the cookie on to the user section
        //cookie section
        const options = {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          httpOnly: true,
          secure: true,
          sameSite: "Strict", //  It can help mitigate certain types of cross-site request forgery (CSRF) attacks
        };

        // res.status(200).cookie("token", token, options).json({
        //   sucess: true,
        //   token,
        //   user,
        //   message: "User login sucessful",
        // });
        if (user.role !== "admin") {
          res.redirect("/userdashboard");
        } else {
          res.redirect("/admindashboard");
        }
      } else {
        return res.status(404).json({ error: "Invalid Password" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
