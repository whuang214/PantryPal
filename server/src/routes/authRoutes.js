const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/authController");

/* Routes */
router.post("/signup", usersCtrl.signup); // signup
router.post("/login", usersCtrl.login); // login

// Google OAuth
router.get("/google", usersCtrl.googleAuth);
router.get("/google/callback", usersCtrl.googleAuthCallback);

module.exports = router;
