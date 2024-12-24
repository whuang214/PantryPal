const List = require("../models/List");

// GET /api/list
// gets all of the current user's lists
const getList = async (req, res) => {
  try {
    const lists = await List.find({ owner: req.user._id });
    res.json(lists);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST /api/list
// creates a new list
const createList = async (req, res) => {
  const { name } = req.body; // TODO: add rest of the fields

  try {
    const newList = new List({ name, owner: req.user._id });
    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getList,
  createList,
};
