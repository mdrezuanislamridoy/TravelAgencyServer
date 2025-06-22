const Review = require("../models/ReviewModel");

exports.addReview = async (req, res) => {
  try {
    const { tourId, userId, rating, review } = req.body;

    if (!tourId || !userId || !rating || !review) {
      return res.status(400).json({ message: "Something gone wrong" });
    }

    const newReview = await new Review({
      tourId,
      userId,
      rating,
      review,
    });

    if (!newReview) {
      return res.status(401).json({ message: "Review addition failed" });
    }
    await newReview.save();
    console.log(newReview);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const { tourId } = req.body;
    if (!tourId) {
      return res.status(400).json({ message: "Tour Id doesn't matched" });
    }
    const reviews = await Review.find({ tourId });
    if (!reviews) {
      return res.status(401).json({ message: "Reviews not available " });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
