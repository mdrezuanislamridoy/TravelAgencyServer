const Booking = require("../models/BookingModel");

exports.bookings = async (req, res) => {
  try {
    const { agencyId } = req.body;
    if (!agencyId) {
      return res.status(400).json({ message: "Agency ID is required" });
    }

    const agencyBookings = await Booking.find({ agencyId });

    if (!agencyBookings.length) {
      return res
        .status(404)
        .json({ message: "No bookings found for this agency" });
    }

    res.status(200).json({ agencyBookings });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.approveBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "Approved" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking approved successfully", booking });
  } catch (error) {
    console.error("Error approving booking:", error);
    return res.status(500).json({ message: "Server error, please try again" });
  }
};

exports.rejectBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "Rejected" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking rejected", booking });
  } catch (error) {
    console.error("Error rejecting booking:", error);
    return res.status(500).json({ message: "Server error, please try again" });
  }
};
