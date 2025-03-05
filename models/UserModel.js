const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["traveler", "agency"],
    required: true,
  },
  trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  profilePicture: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
