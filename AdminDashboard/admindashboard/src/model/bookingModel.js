const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  seatId: { type: [[String]], required: true }, // Nested array of strings
  matchId: { type: String, required: true },
  customerEmail: { type: String, required: true },
  bookingDate: { type: String, required: true },
  bookingStatus: { type: String, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
