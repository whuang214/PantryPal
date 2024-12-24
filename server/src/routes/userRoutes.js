const express = require("express");
const router = express.Router();

// GET /api/users
router.get("/", (req, res) => {
  res.json({ message: "User route" });
});

module.exports = router;
