const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
const { authorize } = require("./middlewares/authorize");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// const formatsLogger = "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/contacts", authorize, contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { message = "Server fall out", status = 500 } = err;
  res.status(status).json({ message });
});

module.exports = app;
