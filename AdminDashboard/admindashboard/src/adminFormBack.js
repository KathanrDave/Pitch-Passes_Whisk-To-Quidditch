// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const User = require("./model/user");
const matchData=require('./model/match');
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());


// Middleware
app.use(express.json());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
// Register admin route
app.post("/register/admin", async (req, res) => {
  console.log('Reached');   
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      role,
    } = req.body;
    // Validate form data
    if (!(firstName && lastName && email && password && phoneNumber && role && confirmPassword)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    else
    {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        confirmPassword:password,
        phoneNumber,
        role,
      });
      // Hash the password
   

    // Save the user to the database
    await newUser.save();
    }
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" }); 
  }
});



// function used to add the match details based on the admin side 

app.post('/admin/addeventdetails',async(req,res)=>{
  console.log('Reached');
try{
// const {matchTitle,venue,matchDetails,dateTime,time,}=req.body;
const venue = req.body.venue;
const matchDetails = req.body.matchDetails;
const matchTitle = req.body.title;
const dateStr = req.body.date;
const time = req.body.time;
const dateTime = new Date(Date.parse(dateStr));
console.log(req.body);
console.log(typeof dateTime);
console.log(typeof time);
console.log(dateTime);
if(!(venue && matchTitle && matchDetails && dateTime && time))
{
  return res.status(400).json({ message: "All fields are required" });  
}
 // Check if user already exists
 const existingMatch = await matchData.findOne({ dateTime: dateTime, time: time });

if (existingMatch) {
  return res.status(409).json({ message: "The match already exists at that time" });
}
 else
 {
  const eventData = new matchData({
    venue,
    matchTitle,
    dateTime: {
      date: dateTime,
      time: time
    },
    matchDetails,
  });
  // Saves the data in the Match Data 
  await eventData.save();
  res.status(201).json({ message: "Match Data Registered Successfully" });
 }
}
catch(error){
console.log(error);
res.status(500).json({ message: "Internal server error" }); 
}
})



// app listening on the port 

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
  