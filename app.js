const express = require("express");
const moment = require("moment");
const fs = require("fs/promises");
const cors = require("cors");

const productsRouter = require("./routes/api/products");

const app = express();

app.use(cors());
app.use("/api/products", productsRouter);

app.listen(3000, () => {
  console.log("=======================");
  console.log("SERVER RUN ON PORT:3000");
  console.log("=======================");
});
