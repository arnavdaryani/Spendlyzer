const mongoose = require("mongoose");

const ReceiptSchema = new mongoose.Schema({
  vendor: String,
  date: Date,
  total: Number,
  category: String,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  rawText: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Receipt", ReceiptSchema);
