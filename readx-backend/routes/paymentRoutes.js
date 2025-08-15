const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/Payment"); // Your mongoose model

const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

// 📦 Create Razorpay Order
router.post("/create-order", async (req, res) => {
  const { amount, bookTitle, name } = req.body;

  if (!amount || !bookTitle || !name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: `rent_${Date.now()}`,
      payment_capture: 1
    });

    await Payment.create({
      name,
      bookTitle,
      transactionId: order.id,
      verified: false
    });

    res.json({ orderId: order.id, key: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error("❌ Order creation failed:", err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

// 📥 Razorpay Webhook
router.post("/webhook", express.json({ type: "application/json" }), async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (signature !== expectedSignature) {
    console.warn("❌ Invalid webhook signature");
    return res.status(400).json({ error: "Invalid signature" });
  }

  try {
    const paymentEntity = req.body.payload.payment.entity;
    const razorpayOrderId = paymentEntity.order_id;

    await Payment.findOneAndUpdate(
      { transactionId: razorpayOrderId },
      { verified: true },
      { new: true }
    );

    console.log("✅ Payment verified:", razorpayOrderId);
    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("❌ Webhook handling failed:", error);
    res.status(500).json({ error: "Webhook failed" });
  }
});

module.exports = router;

