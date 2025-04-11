// models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  title: String,
  price: Number,
  rentAmount: Number,
  duration: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
