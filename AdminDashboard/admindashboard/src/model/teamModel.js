const mongoose = require('mongoose');

// Define the Team schema
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// Create a model from the schema
const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
