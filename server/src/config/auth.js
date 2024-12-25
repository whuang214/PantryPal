const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  // Check for the token being sent in three different ways
  let token = req.get("Authorization") || req.query.token || req.body.token;

  if (token) {
    // Remove the 'Bearer ' if it was included in the token header
    token = token.replace("Bearer ", "");

    // Check if token is valid and not expired
    jwt.verify(token, JWT_SECRET, async function (err, decoded) {
      if (err) {
        next(err); // Pass the error to error-handling middleware
      } else {
        // It's a valid token, find the user and attach it to the request object
        try {
          const user = await User.findById(decoded.id).select("-password");
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          req.user = user;
          console.log("req.user in auth.js: ", req.user);
          next();
        } catch (err) {
          console.log("Error fetching user: ", err);
          next(err); // Pass the error to error-handling middleware
        }
      }
    });
  } else {
    // No token provided, continue without req.user
    next();
  }
}

// Helper to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  } else {
    return res.status(401).json({ error: "User is not authenticated" });
  }
}

module.exports = { authenticateToken, isAuthenticated };
