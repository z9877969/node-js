const products = require("./products");

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

invokeAction({ action: "getAll" });
// invokeAction({ action: "getById", id: 654 });
// invokeAction({ action: "add", model: "iPhone XXX", price: 199000 });
// invokeAction({ action: "removeById", id: "62f7f2d19cf77b812a529e74" });

const actionIndex = process.argv.indexOf("--action");
if (actionIndex !== -1) {
  const action = process.argv[actionIndex + 1];
  invokeAction({ action });
}
