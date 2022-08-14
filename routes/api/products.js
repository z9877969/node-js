const express = require("express");
const products = require("../../data/products.json");

const router = express.Router();

router.get("", (req, res) => {
  res.json(products);
});

router.get("/:id", (req, res) => {});

router.post("", (req, res) => {});

module.exports = router;
