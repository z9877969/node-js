const products = require("./products");
// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");
const { program } = require("commander");

const invokeAction = async ({ action, id, model, price }) => {
  switch (action) {
    case "getAll":
      const allProducts = await products.getAll();
      console.log(allProducts);
      break;
    case "getById":
      const oneProduct = await products.getById(id);
      console.log(oneProduct);
      break;
    case "add":
      const newProduct = await products.add({ model, price });
      console.log(newProduct);
      break;
    case "removeById":
      const deletedProduct = await products.removeById(id);
      console.log(deletedProduct);
      break;
    default:
      console.log("Unknown action");
  }
};

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-m,--model <type>")
  .option("-p,--price <type>");

program.parse(process.argv);

const options = program.opts();

invokeAction(options);
