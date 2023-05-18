const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST, PORT = 4040 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () =>
      console.log(
        " ============================",
        "\n",
        `SERVER STARTED ON PORT ${PORT}\n`,
        "============================"
      )
    );
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
