require("dotenv").config(); // Load environment variables
const express = require("express"); // Express web server framework
const morgan = require("morgan"); // Logging middleware
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectDB();

/* Middleware */
app.use(morgan("dev")); // add logging middleware
app.use(express.json()); // allows for json requests

app.use(require("./config/auth")); // add req.user if token is valid

/* Routes */
app.use("api/auth", require("./routes/authRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
