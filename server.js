const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the CORS module
const app = express();
const port = process.env.PORT || 8000;
const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  console.log(`Requested URL: ${req.url}`);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var corsOptions = {
    origin: ["http://localhost:3000, http://18.191.79.11:8080"]
  };
  
  app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("It's working");
});

// routes should be here
const userSignupRoute = require("./app/routes/userSignupRoutes");
const userLoginRoute = require("./app/routes/userLoginRoutes");
const userResetPasswordRoute = require("./app/routes/userResetPasswordRoutes");
const userUpdateRoute = require("./app/routes/userUpdateRoutes");
const userFeedbackRoute = require("./app/routes/userFeedbackRoutes");
const questionsRoutes = require("./app/routes/questionsRoutes");
const analyticsRoutes = require("./app/routes/analyticsRoutes");
const usersRoutes = require("./app/routes/userRoutes");
const locationHistoryRoutes = require("./app/routes/historyRoutes");
const emergencyRoutes = require("./app/routes/emergencyRoutes");

//middlewares here
app.use("/api/v1/signup", userSignupRoute)
app.use("/api/v1/login", userLoginRoute)
app.use("/api/v1", userResetPasswordRoute)
app.use("/api/v1/update", userUpdateRoute)
app.use("/api/v1/feedback", userFeedbackRoute)
app.use("/api/v1/question", questionsRoutes)
app.use("/api/v1/analytics", analyticsRoutes)
app.use("/api/v1/users", usersRoutes)
app.use("/api/v1/location/history", locationHistoryRoutes)
app.use("/api/v1/emergency", emergencyRoutes)

//port listening
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
module.exports = app;
