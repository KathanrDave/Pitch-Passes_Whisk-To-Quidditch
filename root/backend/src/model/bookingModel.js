// bookingsModel.js
const mongoose = require('mongoose');
const Match = require('./matchModel'); // Assuming the path to the matchModel.js file is correct.
const Seat=require('./seatModel');
const bookingSchema = new mongoose.Schema({
  seatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seat', required: true },
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true }, // Using the 'Match' model as a reference.
  customerName: { type: String, required: true },
  bookingDate: { type: Date, required: true },
  bookingStatus: { type: String, required: true },
  // Other relevant booking fields
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
