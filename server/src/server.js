require("dotenv").config(); // Load environment variables
const express = require("express"); // Express web server framework
const morgan = require("morgan"); // Logging middleware
const connectDB = require("./config/db");
const passport = require("./config/passport"); // Import passport configuration

const { isAuthenticated, authenticateToken } = require("./config/auth");

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectDB();

/* Middleware */
app.use(morgan("dev")); // add logging middleware
app.use(require("./config/corsConfig")); // add cors middleware
app.use(express.json()); // allows for json requests
app.use(passport.initialize()); // Initialize Passport

/* Routes */
app.use("/api/auth", require("./routes/authRoutes"));
app.use(
  "/api/users",
  authenticateToken,
  isAuthenticated,
  require("./routes/userRoutes")
); // only accessible if logged in

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
