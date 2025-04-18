// models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  name: String,
  transactionId: String,
  bookTitle: String,
  verified: { type: Boolean, default: false },
});

module.exports = mongoose.model("Payment", paymentSchema);


