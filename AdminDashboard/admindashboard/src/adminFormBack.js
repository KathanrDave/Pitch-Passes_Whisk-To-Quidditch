// backend/server.js
const { MongoClient } = require("mongodb");
const { ObjectId } = require('mongodb');
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const User = require("./model/user");
const Team =require("./model/teamModel");
const Seat=require("./model/seatModel");
const matchData = require("./model/matchModel");
const Player=require("./model/teamPlayer");
const Tower=require("./model/towerModel");
const Booking=require("./model/bookingModel");
const cors = require("cors");

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json());
app.use(bodyParser.json());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
// Register admin route
app.post("/register/admin", async (req, res) => {
  console.log("Reached");
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
    if (
      !(
        firstName &&
        lastName &&
        email &&
        password &&
        phoneNumber &&
        role &&
        confirmPassword
      )
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        confirmPassword: password,
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

app.post("/admin/addeventdetails", async (req, res) => {
  console.log("Reached");
  try {
    // const matchId = req.query.matchId;
    const venue= req.body.venue;
    const matchDetails = req.body.matchDetails;
    const matchTitle = req.body.matchTitle;
    const datetime = {
      time: new Date(req.body.time).toISOString(),
      date: new Date(Date.parse(req.body.date))
    }
    if (!(venue && matchTitle && matchDetails && datetime)) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if match already exists
    const existingMatch = await matchData.findOne({
      $and: [
        { "dateTime.date": datetime.date },
        { "dateTime.time": datetime.time }
      ]
    });
    
    if (existingMatch) {
      console.log("conflict");
      return res
        .status(409)
        .json({ message: "The match already exists at that time" });
    } else {
      const eventData = new matchData({
        venue,
        matchTitle,
        dateTime: {
          date: datetime.date,
          time: datetime.time,
        },
        matchDetails,
      });
      // Saves the data in the Match Data
      await eventData.save();
      res.status(201).json({ message: "Match Data Registered Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.get(`/admin/extractdetails`, async (req, res) => {
  try {
    const matchId = req.query.matchId;
    const existingMatch = await matchData.findOne({ _id: matchId });
    // console.log(typeof (existingMatch.dateTime))
     
    if (!existingMatch) {
      console.log("Match not found");
      return res.status(404).send('Match not found');
    }

    console.log("Match found:", existingMatch);
    res.send(existingMatch);
  } catch (error) {
    console.error('Error retrieving match data:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/book-tickets/${matchId}',async(req,res) => {

})

// to get the seat prices 

// API endpoint to get the seat price based on matchId and seatKey

app.get('/admin/addseats/checkSeatsPrice', async (req, res) => {
  const { matchId, seatKey } = req.query;

  try {
    // Find the seat based on matchId and seatKey in the database
    const seat = await Seat.findOne({ matchId, seatNumber: seatKey });

    if (!seat) {
      return res.status(404).json({ message: 'Seat price not found' });
    }

    // Respond with the seat price and seatType
    res.json({ price: seat.seatPrice, seatType: seat.seatType });
  } catch (err) {
    console.error('Error fetching seat price:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// to fetch the team names and its particular object ids

app.get('/getTeamNames', async (req, res) => {
  try {
    const teams = await Team.find({}, '_id name'); 
    const idToNameMap = {};
    teams.forEach((team) => {
      idToNameMap[team._id] = team.name;
    });

    res.json(idToNameMap);
  } catch (error) {
    console.error('Error in finding the list of Team Names', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// to fetch the paticular team information based on the team id


// Route to fetch all players of a specific team
app.get('/getteam', async (req, res) => {
  try {
    const teamName = req.query.teamName;
    console.log(teamName);
    const teamData = await Player.find({ team: teamName });
    console.log(teamData);
    if (teamData.length === 0) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(teamData);
  } catch (error) {
    console.error('Error in fetching team data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route for adding user teams

// Route for adding user teams
app.post("/adduserteams", (req, res) => {
  const teamData = req.body;
  console.log(teamData);
  // Convert the base64 image data to a Buffer
  const imageBuffer = Buffer.from(teamData.image.data, "base64");

  // Create a new player using the Player model
  const newPlayer = new Player({
    team: teamData.team,
    role: teamData.role,
    name: teamData.name,
    matches: teamData.matches,
    image: {
      data: imageBuffer,
      contentType: teamData.image.contentType,
    },
  });

  // Save the new player to the database
  newPlayer
    .save()
    .then(() => {
      console.log("New player added:", newPlayer);
      res.status(201).json({ message: "Player added successfully" });
    })
    .catch((error) => {
      console.error("Error adding player:", error);
      res.status(500).json({ message: "Failed to add player" });
    });
});


// to create the backend database
app.post(`/admin/addseats/createseats`,async(req,res) => {
const newSeat = new Seat(req.body);
try {
  // Save the newSeat to MongoDB
  const savedSeat = await newSeat.save();
  console.log('Seat saved successfully:', savedSeat);
} catch (error) {
  console.error('Error saving seat:', error);
}
});


// to sort the data of seats accordingly


// async function sortData(){
//   const client = new MongoClient(MONGO_URL);
//   try{
    
//     await client.connect();
//     const sortField = "seatNumber";
//     const sortOrder = 1; // 1 for ascending order, -1 for descending order

//     const sortResult = await Seat.find().sort({ [sortField]: sortOrder }).toArray();
//     console.log("Sorted Result:", sortResult); 

//   }catch(error)
//   {
//     console.error("Error:", error)
//   }finally {
  //     client.close();
//   }
  
// }

// to check a seat on the backend database
app.get('/admin/addseats/checkseats', async (req, res) => {
  const matchId = req.query.matchId;
  const seatKey = req.query.seatKey;

  try {
    const checkSeat = await Seat.findOne({ seatNumber: seatKey, matchId: matchId });
    if (checkSeat) {
      console.log(checkSeat); // Optional: Log the seat details if it exists
      res.send('true'); // Seat exists, return true as a response
    } else {
      res.send('false'); // Seat does not exist, return false as a response
    }
  } catch (error) {
    // Handle any errors that might occur during the asynchronous operations
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
})

// To get the match Id out of it 
app.get(`/getDetails`,async(req,res)=>{
  try {
    const matchId = req.query.matchId;
    // const customerId = new mongoose.Types.ObjectId(matchId);
    const customerEmail = req.query.email; 
    console.log('Backend',customerEmail,matchId)
    // console.log('Reached')
    const customerDetails= await Booking.findOne({ matchId: matchId, customerEmail });
      // console.log(customerDetails);
      
    const matchDetails=await matchData.findOne({_id:matchId});
    // console.log(matchDetails);
     if (customerDetails && matchDetails) {
      const TicketData={
        matchTitle:matchDetails.matchTitle,
        matchTime:matchDetails.dateTime.time,
        matchDate:matchDetails.dateTime.date,
        seats:customerDetails.seatId,
      }
      console.log(TicketData);
      res.status(200).json(TicketData);          
      }
     else {
      res.status(404).json({ error: 'Match not found.' });
    }
    }
  catch (error) {
    console.error('Error fetching match title:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});



// To get the list of the seats booed or available by the user
app.get(`/users/seatList`,async(req,res)=>{
try{
 const matchId=req.query.matchId;
 const data=await Tower.findOne({matchId:matchId});
 if(!data){
return res.status(404).json({message:`Match Not Found`});
 }
 res.status(200).json({ booked: data.bookedSeats, unavailable: data.unavailableSeats });
}catch(error){
  console.error('Error fetching data:', error);
  res.status(500).json({ message: 'Server error' });
}
})


// to make the seats unavailable 
app.put(`/admin/addseats/setunavailable`, async (req, res) => {
  try {
    console.log("reached");
    const { unavailableSeats } = req.body;
    for (const seat of unavailableSeats) {
      console.log(typeof(seat));
    }
    // Validate that unavailableSeats is an array
    if (!Array.isArray(unavailableSeats)) {
      return res.status(400).json({ error: 'Invalid data format. unavailableSeats should be an array.' });
    }
    // Loop through the seat numbers to check if each seat exists in the database
    for (const seatNumber of unavailableSeats) {
      console.log(seatNumber);
      const existingSeat = await Seat.findOne({ seatNumber: seatNumber.toString() });
       console.log(seatNumber.toString());
      if (existingSeat) {
        // If the seat exists, update its seatAvailability to 'unavailable'
        existingSeat.seatAvailability = 'unavailable';
        await existingSeat.save();
      } else {
        console.error('Seat does not exist');
      }
    }

    res.json({ message: 'Seats updated successfully.' });
  } catch (err) {
    console.error('Error updating seats:', err);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

app.post('/setBookingSeat', async (req, res) => {
  try {
    const matchId = req.query.matchId;
    const email = req.query.email;
    const  seatsArray  = req.body.seatsId;
    console.log(matchId, email);
    console.log(seatsArray);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0,10);
    console.log(currentDate);
    const data = new Booking({
      seatId: seatsArray,
      matchId: matchId,
      customerEmail: email,
      bookingDate: formattedDate,
      bookingStatus: 'Amount Paid By the User',
    });
    console.log(data);
    await data.save();
    console.log('Data Sent Successfully');
    res.status(200).send('Data Sent Successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while processing the request');
  }
});


app.put('/updateBookingSeat', async (req, res) => {
  try {
    const matchId = req.query.matchId;
    const bookedSeats = req.body.seatsId;
    
    console.log(matchId,bookedSeats);

    const existingMatch= await Tower.findOne({ matchId: matchId });
    if (existingMatch) {
      console.log('Match found:', existingMatch);
      for(let i=0; i<bookedSeats[0].length; i++) {
        existingMatch.bookedSeats.push(bookedSeats[0][i]);
      }
      await existingMatch.save();
      console.log('Seats added successfully');
      res.status(200).send('Seats added successfully');
    } else {
      console.log('Match not found');
      res.status(404).send('Match not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while processing the request');
  }
});

// Update the match show bar
app.put(`/admin/updaterecords`, async (req, res) => {
  try {
    const matchId = req.query.matchId;
    const venue= req.body.venue;
    const matchDetails = req.body.matchDetails;
    const matchTitle = req.body.matchTitle;
    const datetime = {
      time: new Date(req.body.time).toISOString(),
      date: new Date(Date.parse(req.body.date))
    }
       console.log(req.body);
       const existingMatch = await matchData.findOne({ _id: matchId });
        existingMatch.venue = venue;
        existingMatch.matchDetails = matchDetails;
        existingMatch.matchTitle = matchTitle;
        existingMatch.dateTime=datetime;
      // Save the updated match in the database
      await existingMatch.save();
      return res.status(200).json({ message: "Match updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});














// app listening on the port

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
