const User = require("../model/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const Signup = async (req, res) => {
  try {
    const { email, password, confirmpassword } = req.body;
    // All the fields are mandatory
    if (!email && !password && !confirmpassword) { 
      res.status(400).send("All fields are mandatory");
    }
    // Check if the user already exists
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      res.status(401).send("User Already Exists");
    }
    if (!password) {
      res.status(400).send("Password is required");
      return;
    }

    const checkUser = password === confirmpassword;

    // encrypting the password
    const saltRounds = 10;
    const myEncPassword = await bcrypt.hash(password, saltRounds);
    const hashedPassword = await bcrypt.hash(confirmpassword, saltRounds);

    // // Regular expression for Indian mobile number validation
    // const indianMobileNumberRegex = /^[6-9]\d{9}$/;

    // // Function to validate Indian mobile number
    // const checkNumber = function validateIndianMobileNumber(mobileNumber) {
    //   return indianMobileNumberRegex.test(mobileNumber);
    // };
    // // TO check the validation of the phone number
    // if (!checkNumber) {
    //   res.status(400).send("Invalid Phone Number");
    // }
    if (checkUser) {
      // save the user in the Database
      const user = await User.create({
        // firstName: firstName,
        // lastName: lastName,
        email: email,
        password: myEncPassword,
        confirmpassword: hashedPassword,
        // mobileNumber: mobileNumber,
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

      res.status(201).json({ user, token });

      return;
    } else {
      res.status(401).send("Password and Confirm Password does not matches");
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

const Signin = async (req, res) => {
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
          return res.json({
            success: true,
            redirectUrl: "/user/profile",
          });
        } else {
          return res.json({ success: true, redirectUrl: "/admindashboard" });
        }
      } else {
        return res.status(404).json({ error: "Invalid Password" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Signup,
  Signin,
};
