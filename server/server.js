require("dotenv").config(); // Load environment variables
const express = require("express"); // Express web server framework
const morgan = require("morgan"); // Logging middleware

const app = express();
const port = process.env.PORT || 3000;

/* Middleware */
app.use(morgan("dev")); // add logging middleware

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
