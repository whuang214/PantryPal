const mongoose = require("mongoose");

// Item Schema
const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    picture: {
      type: String,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    expirationDate: {
      type: Date,
    },
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;
