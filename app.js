const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors"); // Import CORS
const movieRoutes = require("./routes/movieRoutes");

const app = express();

app.use(bodyParser.json());
// Enable CORS for all requests
app.use(cors());
app.use("/api", userRoutes);
app.use("/api/iblix", movieRoutes);

sequelize.sync().then(() => {
  console.log("Database connected!");
});

module.exports = app;
