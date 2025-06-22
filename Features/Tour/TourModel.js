const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  agencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookings: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Booking",
    default: [],
  },
  completedTours: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Booking",
    default: [],
  },
  createdAt: { type: Date, default: Date.now },
});

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
