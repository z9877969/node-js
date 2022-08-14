const fs = require("fs/promises");

fs.readFile("./files/file.txt")
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

const fileOperation = async (filePath, action, data) => {
  switch (action) {
    case "read":
      const text = await fs.readFile(filePath, "utf-8");
      console.log(text);
      // const file = await fs.readFile(filePath);
      // const text = file.toString();
      // console.log(text);
      break;
    case "add":
      await fs.appendFile(filePath, data);
      break;
    case "replace":
        await fs.writeFile(filePath, data)
    default:
      console.log("Unknown action");
  }
};

// fileOperation("./files/file.txt", "read");
// fileOperation("./files/file.txt", "add", "\nSome text that must be added");
fileOperation("./files/file.txt", "replace", "Updating text");
