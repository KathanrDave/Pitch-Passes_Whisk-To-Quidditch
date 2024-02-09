const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  venue: {
    type: String,
    required: true
  },
  matchTitle: {
    type: String,
    required: true
  },
  dateTime: {
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  },
  matchDetails: {
    type: String,
    required: true
  }
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
