const matchData = require("../model/matchModel");
require("dotenv").config();

const Addeventdetails = async (req, res) => {
  console.log("Reached");
  try {
    // const matchId = req.query.matchId;
    const venue = req.body.venue;
    const matchDetails = req.body.matchDetails;
    const matchTitle = req.body.matchTitle;
    const datetime = {
      time: new Date(req.body.time).toISOString(),
      date: new Date(Date.parse(req.body.date)),
    };
    if (!(venue && matchTitle && matchDetails && datetime)) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if match already exists
    const existingMatch = await matchData.findOne({
      $and: [
        { "dateTime.date": datetime.date },
        { "dateTime.time": datetime.time },
      ],
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
};

const Extractdetails = async (req, res) => {
  try {
    const matchId = req.query.matchId;
    const existingMatch = await matchData.findOne({ _id: matchId });
    // console.log(typeof (existingMatch.dateTime))

    if (!existingMatch) {
      console.log("Match not found");
      return res.status(404).send("Match not found");
    }

    console.log("Match found:", existingMatch);
    res.send(existingMatch);
  } catch (error) {
    console.error("Error retrieving match data:", error);
    res.status(500).send("Internal Server Error");
  }
};

// API endpoint to get the seat price based on matchId and seatKey
const checkSeatsPrice = async (req, res) => {
  const { matchId, seatKey } = req.query;

  try {
    // Find the seat based on matchId and seatKey in the database
    const seat = await Seat.findOne({ matchId, seatNumber: seatKey });

    if (!seat) {
      return res.status(404).json({ message: "Seat price not found" });
    }

    // Respond with the seat price and seatType
    res.json({ price: seat.seatPrice, seatType: seat.seatType });
  } catch (err) {
    console.error("Error fetching seat price:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
// to create the backend database
const createseats = async (req, res) => {
  const newSeat = new Seat(req.body);
  try {
    // Save the newSeat to MongoDB
    const savedSeat = await newSeat.save();
    console.log("Seat saved successfully:", savedSeat);
  } catch (error) {
    console.error("Error saving seat:", error);
  }
};
// to check a seat on the backend database
const checkseats = async (req, res) => {
  const matchId = req.query.matchId;
  const seatKey = req.query.seatKey;

  try {
    const checkSeat = await Seat.findOne({
      seatNumber: seatKey,
      matchId: matchId,
    });
    if (checkSeat) {
      console.log(checkSeat); // Optional: Log the seat details if it exists
      res.send("true"); // Seat exists, return true as a response
    } else {
      res.send("false"); // Seat does not exist, return false as a response
    }
  } catch (error) {
    // Handle any errors that might occur during the asynchronous operations
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// to make the seats unavailable
const setunavailable = async (req, res) => {
  try {
    console.log("reached");
    const { unavailableSeats } = req.body;
    for (const seat of unavailableSeats) {
      console.log(typeof seat);
    }
    // Validate that unavailableSeats is an array
    if (!Array.isArray(unavailableSeats)) {
      return res.status(400).json({
        error: "Invalid data format. unavailableSeats should be an array.",
      });
    }
    // Loop through the seat numbers to check if each seat exists in the database
    for (const seatNumber of unavailableSeats) {
      console.log(seatNumber);
      const existingSeat = await Seat.findOne({
        seatNumber: seatNumber.toString(),
      });
      console.log(seatNumber.toString());
      if (existingSeat) {
        // If the seat exists, update its seatAvailability to 'unavailable'
        existingSeat.seatAvailability = "unavailable";
        await existingSeat.save();
      } else {
        console.error("Seat does not exist");
      }
    }

    res.json({ message: "Seats updated successfully." });
  } catch (err) {
    console.error("Error updating seats:", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

// Update the match show bar
const updaterecords = async (req, res) => {
  try {
    const matchId = req.query.matchId;
    const venue = req.body.venue;
    const matchDetails = req.body.matchDetails;
    const matchTitle = req.body.matchTitle;
    const datetime = {
      time: new Date(req.body.time).toISOString(),
      date: new Date(Date.parse(req.body.date)),
    };
    console.log(req.body);
    const existingMatch = await matchData.findOne({ _id: matchId });
    existingMatch.venue = venue;
    existingMatch.matchDetails = matchDetails;
    existingMatch.matchTitle = matchTitle;
    existingMatch.dateTime = datetime;
    // Save the updated match in the database
    await existingMatch.save();
    return res.status(200).json({ message: "Match updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  Extractdetails,
  Addeventdetails,
  checkSeatsPrice,
  createseats,
  checkseats,
  setunavailable,
  updaterecords
};
