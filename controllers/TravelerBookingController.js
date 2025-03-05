const Booking = require("../models/BookingModel");
exports.addBooking = async (req, res) => {
  try {
    const { userId, tourId, agencyId, numberOfTraveler, tourDate, totalPrice } =
      req.body;
    if (
      !userId ||
      !tourId ||
      !agencyId ||
      !numberOfTraveler ||
      !tourDate ||
      !totalPrice
    ) {
      return res.status(400).json({ message: "Something is missing" });
    }

    const newBooking = await Booking.create({
      userId,
      tourId,
      agencyId,
      numberOfTraveler,
      tourDate,
      totalPrice,
    });

    await newBooking.save();
    res
      .status(200)
      .json({ message: "Booking successful!", bookingId: newBooking._id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const { userId } = req.body;
    const myBookings = await Booking.find({ userId });

    if (!myBookings) {
      return res.status(400).json({ message: "Booking not available" });
    }
    res.status(201).json({ myBookings });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "Cancelled" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res
      .status(200)
      .json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return res.status(500).json({ message: "Server error, please try again" });
  }
};
