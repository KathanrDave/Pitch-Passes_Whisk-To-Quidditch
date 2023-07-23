const mongoose = require('mongoose');
const Match = require('./matchModel');

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String },
  seatAvailability: { type: String, required: true, default: 'available' }, // Set default to 'available'
  seatPrice: { type: Number, required: true,default:100 },
  seatType: { type: String, required: true ,default:'Silver'},
  matchId: { type: String,}
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;
