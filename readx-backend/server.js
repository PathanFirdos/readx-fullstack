require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API Routes
app.use("/api/audiobooks", require("./routes/audiobooks"));
app.use("/api/ebooks", require("./routes/ebooks"));
app.use("/api/comics", require("./routes/comics"));
app.use("/api/payment", require("./routes/paymentRoutes"));

// Serve static books folder
app.use("/books", express.static(path.join(__dirname, "books")));

// Serve React frontend build
const buildPath = path.join(__dirname, "../readx-app/build");
app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


