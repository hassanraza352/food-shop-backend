const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: [
        "Pending",
        "Confirmed",
        "Preparing",
        "Out for Delivery",
        "Delivered",
        "Cancelled"
    ],
    default: "Pending"
  },

  phone: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);