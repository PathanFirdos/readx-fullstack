const express = require("express");
const router = express.Router();
const ebookCategories = require("../data/ebooks");

router.get("/categories", (req, res) => {
  res.json(ebookCategories);
});

module.exports = router;

