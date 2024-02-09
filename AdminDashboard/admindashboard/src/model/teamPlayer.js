const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  team: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  matches: {
    type: Number,
    required: true
  },
  image: {
    data: Buffer, // Store the image data as a Buffer
    contentType: String // Store the content type (e.g., 'image/png') for retrieval
  }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
