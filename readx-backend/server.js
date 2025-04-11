const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/readx", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
const audiobookRoutes = require("./routes/audiobooks");
const ebookRoutes = require("./routes/ebooks");
const comicRoutes = require("./routes/comics");
const paymentRoutes = require("./routes/paymentRoutes");

app.use("/api/audiobooks", audiobookRoutes);
app.use("/api/ebooks", ebookRoutes);
app.use("/api/comics", comicRoutes);
app.use("/api/payment", paymentRoutes);

// Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
