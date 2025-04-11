// routes/audiobooks.js

const express = require("express");
const router = express.Router();
const audiobookCategories = require("../data/audiobooks");

router.get("/categories", (req, res) => {
  res.json(audiobookCategories);
});

module.exports = router;


  