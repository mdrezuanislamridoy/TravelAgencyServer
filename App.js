const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const database = require("./config/db");
const authRoute = require("./routes/AuthenticationRoutes");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const TourRoute = require("./routes/TourRoute");

//database connection
database();

// middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

//Routes
app.use("/api/auth", authRoute);
app.use("/api/tour", TourRoute);

module.exports = app;
