const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET /api/user
router.get("/", (req, res) => {
  userController.getUser(req, res);
});

module.exports = router;
