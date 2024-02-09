const mongoose = require("mongoose");

// Define the Match schema
const matchSchema = new mongoose.Schema({
  matchId: {
    type: String,
    required: true,
    unique: true,
  },
  numRows: {
    type: Number,
    required: true,
  },
  numMatrices: {
    type: Number,
    required: true,
  },
  numSeatsPerRow: {
    type: Number,
    required: true,
  },
});

// Create a model from the schema
const Match = mongoose.model("MatchSeat", matchSchema);

module.exports = Match;
