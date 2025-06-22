const TravelBookingRoute = require("express").Router();
const { IsUser } = require("../../middleware/JWTAuth");
const { getMyBookings, addBooking } = require("./TravelerBookingController");

TravelBookingRoute.get("/myBooking", IsUser, getMyBookings);
TravelBookingRoute.post("/addBooking", IsUser, addBooking);

module.exports = TravelBookingRoute;
