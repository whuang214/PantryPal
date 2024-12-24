const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  // Check for the token being sent in three different ways
  let token = req.get("Authorization") || req.query.token || req.body.token;

  if (token) {
    // Remove the 'Bearer ' if it was included in the token header
    token = token.replace("Bearer ", "");

    // Check if token is valid and not expired
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      if (err) {
        next(err); // Pass the error to error-handling middleware
      } else {
        // It's a valid token, so add user to req
        req.user = decoded.user;
        next();
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
