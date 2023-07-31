const mongoose = require('mongoose');

const matchSeatSchema = new mongoose.Schema({
  matchId: {
    type: String,
    required: true,
    unique: true
  },
  bookedSeats: {
    type: [String],
    default: []
  },
  unavailableSeats: {
    type: [String],
    default: []
  }
});

const MatchSeat = mongoose.model('Tower', matchSeatSchema);

module.exports = MatchSeat;
