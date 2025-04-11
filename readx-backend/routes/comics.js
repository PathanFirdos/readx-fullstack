// routes/comics.js

const express = require("express");
const router = express.Router();
const comicCategories = require("../data/comics");

router.get("/categories", (req, res) => {
  res.json(comicCategories);
});

module.exports = router;

  