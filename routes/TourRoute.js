const TourRoute = require("express").Router();
const { IsUser } = require("../middleware/JWTAuth");
const {
  getSingleTour,
  getAgencyTours,
  getTours,
  addTour,
} = require("../controllers/TourController");

TourRoute.get("/getSingleTour", getSingleTour);
TourRoute.get("/getAgencyTours", getAgencyTours);
TourRoute.get("/getTours", IsUser, getTours);
TourRoute.post("/addTour", IsUser, addTour);

module.exports = TourRoute;
