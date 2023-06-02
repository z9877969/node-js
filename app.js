const express = require("express");
const fs = require("fs/promises");
const cors = require("cors");
const usersRouter = require("./routes/api/users");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// app.use("/api/products", productsRouter);
app.use("/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(async (err, req, res, next) => {
  const { message, status = 500 } = err;
  res.status(status).json({ message });
});

module.exports = app;
