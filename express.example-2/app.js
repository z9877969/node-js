const express = require("express");
const products = require("./products.json");

const app = express();

// app.set("json space", 8);

app.get("/products", (req, res) => {
  // res.send(products);
  // res.json(null);
  res.json(products);
});

app.listen(3000, () => {
  console.log("=======================");
  console.log("SERVER RUN ON PORT:3000");
  console.log("=======================");
});
