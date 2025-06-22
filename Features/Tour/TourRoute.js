const TourRoute = require("express").Router();
const { IsUser } = require("../../middleware/JWTAuth");
const {
  getSingleTour,
  getAgencyTours,
  getTours,
  addTour,
} = require("./TourController");

TourRoute.get("/getSingleTour/:tourId", getSingleTour);
TourRoute.get("/getAgencyTours/:agencyId", IsUser, getAgencyTours);
TourRoute.get("/getTours", IsUser, getTours);
TourRoute.post("/addTour", IsUser, addTour);

module.exports = TourRoute;
