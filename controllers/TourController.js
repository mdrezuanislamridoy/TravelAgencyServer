const Tour = require("../models/TourModel");

exports.addTour = async (req, res) => {
  try {
    const { name, description, price, location, agencyId } = req.body;
    if (!name || !description || !price || !location || !agencyId) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    const newTour = await new Tour({
      name,
      description,
      price,
      location,
      agencyId,
    });
    if (!newTour) {
      return res.status(503).json({ message: "Something went wrong" });
    }

    await newTour.save();
    console.log(newTour);
  } catch (error) {
    return res.status(503).json({ message: `error ${error}` });
  }
};

exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({ tours });
  } catch (error) {
    return res.status(503).json({ message: `error ${error}` });
  }
};

exports.getAgencyTours = async (req, res) => {
  try {
    const agencyId = req.body;
    const tours = await Tour.find({ agencyId });
    res.status(200).json({ tours });
  } catch (error) {
    return res.status(503).json({ message: `error ${error}` });
  }
};

exports.getSingleTour = async (req, res) => {
  try {
    const tourId = req.body;
    const tour = await Tour.findOne({ tourId });
    res.status(200).json({ tour });
  } catch (error) {
    return res.status(503).json({ message: `error ${error}` });
  }
};
