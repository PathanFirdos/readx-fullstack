

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/readx", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Route Imports
const audiobookRoutes = require("./routes/audiobooks");
const ebookRoutes = require("./routes/ebooks");
const comicRoutes = require("./routes/comics");
const paymentRoutes = require("./routes/paymentRoutes");

// Mount Routes
app.use("/api/audiobooks", audiobookRoutes);
app.use("/api/ebooks", ebookRoutes);
app.use("/api/comics", comicRoutes);
app.use("/api/payment", paymentRoutes);

// Serve static books folder
app.use("/books", express.static(path.join(__dirname, "books")));

// Root route to prevent "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Welcome to the ReadX server!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
