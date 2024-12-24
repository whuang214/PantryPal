const mongoose = require("mongoose");
const Item = require("./Item");

// List Schema
const ListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true } // createdAt, updatedAt
);
