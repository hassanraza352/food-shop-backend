const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true
  },

  description: {
    type: String,
  },

  price: {
    type: Number,
    required: true
  },

  image: {
    type: String
  },

  category: {
    type: String,
    required: true
  },

  available: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Food", foodSchema);