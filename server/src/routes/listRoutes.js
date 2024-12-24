const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");

// GET /api/list
// gets all of the current user's lists
router.get("/", (req, res) => {
  listController.getList(req, res);
});
