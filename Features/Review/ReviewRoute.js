const { getAllReviews, addReview } = require("./ReviewController");

const ReviewRoute = require("express").Router();

ReviewRoute.get("/getReviews", getAllReviews);
ReviewRoute.post("/addReview", addReview);

module.exports = ReviewRoute;
