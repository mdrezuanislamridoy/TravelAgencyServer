const Booking = require("./BookingModel");
const User = require("../../Authentication/UserModel");
exports.addBooking = async (req, res) => {
  const userId = req.user._id;
  try {
    const {
      tourName,
      tourLocation,

      tourId,
      agencyId,
      numberOfTraveler,
      tourDate,
      totalPrice,
      paymentTime,
    } = req.body;
    if (
      !userId ||
      !tourId ||
      !agencyId ||
      !numberOfTraveler ||
      !tourDate ||
      !totalPrice ||
      !tourName ||
      !tourLocation ||
      !paymentTime
    ) {
      console.log("missing something");
      return res.status(400).json({ message: "Something is missing" });
    }

    const newBooking = await Booking.create({
      userId,
      tourId,
      agencyId,
      numberOfTraveler,
      tourDate,
      totalPrice,
      tourName,
      tourLocation,
    });
    console.log("Booking Success");

    const updateUser = await User.findByIdAndUpdate(userId, {
      $push: { bookings: newBooking._id },
    });
    console.log("user updated");

    await updateUser.save();

    await newBooking.save();
    console.log("Booking success");

    res.status(200).json({
      message: "Booking successful!",
      bookingId: newBooking._id,
      paymentTime,
    });
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
