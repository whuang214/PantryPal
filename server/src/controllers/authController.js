const User = require("../models/User");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const JWT_SECRET = process.env.JWT_SECRET;

// Signup controller
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Generate a JWT for the user
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({ token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error signing up user", error: err.message });
  }
};

// Login controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the entered password with the stored password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT for the user
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "24h" });

    res.status(200).json({ token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error logging in user", error: err.message });
  }
};

// Google Auth controllers
const googleAuth = async (req, res) => {
  // this will redirect the user to Google's OAuth 2.0 server
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
};

const googleAuthCallback = async (req, res) => {
  // this will authenticate the user with Google after the user has granted permission
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err || !user) {
      // in case of an error or no user
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Generate a JWT for the user
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "24h" });

    res.status(200).json({ token });
  })(req, res, next);
};

module.exports = { signup, login, googleAuth, googleAuthCallback };
