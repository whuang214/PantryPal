const User = require("../models/User");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (err) {
    console.log("Error getting user: ", err);
    res.status(500).json({ message: "Error getting user", error: err.message });
  }
};

module.exports = {
  getUser,
};
