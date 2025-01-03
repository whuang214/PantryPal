const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/authController");

/* Routes */
// router.post("/signup", authCtrl.signup); // signup
// router.post("/login", authCtrl.login); // login

router.get("/google", authCtrl.googleAuth);
router.get("/google/callback", authCtrl.googleAuthCallback);

router.get("/github", authCtrl.githubAuth);
router.get("/github/callback", authCtrl.githubAuthCallback);

module.exports = router;
