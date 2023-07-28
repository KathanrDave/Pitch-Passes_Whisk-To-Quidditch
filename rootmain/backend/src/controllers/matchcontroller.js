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

module.exports = {
  Extractdetails,
  Addeventdetails,
};
