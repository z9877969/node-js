const express = require("express");

const app = express();
// console.log(app);
app.get("/", (req, res) => {
  console.log("req :>> ", req);
  console.log("res :>> ", res);
  res.send("<h1>Home Page</h1>");
});

app.get("/products", (req, res) => {
//   console.log("req :>> ", req);
//   console.log("res :>> ", res);
  res.send("<h1>Products Page</h1>");
});

app.listen(3000, () => {
  console.log("=======================");
  console.log("SERVER RUN ON PORT:3000");
  console.log("=======================");
});
