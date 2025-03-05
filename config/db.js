const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL =
  process.env.DB_URL ||
  "mongodb+srv://mdrezuanislamridoy:RRRidoy781@rrcluster.dzwno.mongodb.net/RRTravel?retryWrites=true&w=majority";

const database = async () => {
  await mongoose.connect(DB_URL);
  console.log("DB Connected");
};

module.exports = database;
