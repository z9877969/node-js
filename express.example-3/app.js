const express = require("express");
const moment = require("moment");
const fs = require("fs/promises");
const cors = require("cors");

const products = require("./products.json");

const app = express();

app.use(cors());

// app.use(async (req, res, next) => {
//   const { method, url } = req;
//   const date = moment().format("DD-MM-YYYY_HH:mm:ss");
//   await fs.appendFile("server.log", `${method} ${url} ${date}\n`);
//   next();
// });

// app.use((req, res, next) => {
//   console.log("First middleware");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("Second middleware");
//   next();
// });

app.get("/products", (req, res) => {
  res.json({
    model: "Model-1",
    price: "2020200",
    id: "15",
  });
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(3000, () => {
  console.log("=======================");
  console.log("SERVER RUN ON PORT:3000");
  console.log("=======================");
});
