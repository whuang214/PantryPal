const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/authController");

/* Routes */
router.post("/signup", usersCtrl.signup); // signup
router.post("/login", usersCtrl.login); // login

module.exports = router;
