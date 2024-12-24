const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");

// GET /api/list
// gets all of the current user's lists
router.get("/", listController.getList);

// POST /api/list
// creates a new list
router.post("/", listController.createList);

module.exports = router;
