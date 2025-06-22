const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const database = require("./config/db");
const authRoute = require("./Authentication/AuthenticationRoutes");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const TourRoute = require("./Features/Tour/TourRoute");
const TravelBookingRoute = require("./Features/Booking/TravelerBookingRoute");
const cookieParser = require("cookie-parser");
const messageRouter = require("./Features/Message/MessageRoute");

//database connection
database();

// middleware
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Routes
app.use("/api/auth", authRoute);
app.use("/api/tour", TourRoute);
app.use("/api/booking", TravelBookingRoute);
app.use("/api/message", messageRouter);

module.exports = app;
