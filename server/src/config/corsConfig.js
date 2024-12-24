const cors = require("cors");

const allowedOrigins = [process.env.CLIENT_URL];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests from development frontend
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allows cookies to be send back
  optionsSuccessStatus: 200, // success status for preflight requests
  methods: ["GET", "POST", "PUT", "DELETE"],
};

module.exports = cors(corsOptions);
