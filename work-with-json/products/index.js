const fs = require("fs/promises");
const path = require("path");
const ObjectID = require("bson-objectid");

const productsPath = path.join(__dirname, "products.json");

const updateProducts = async (products) =>
  await fs.writeFile(productsPath, JSON.stringify(products, null, 2));

const getAll = async () => {
  //   const result = await fs.readFile(__dirname + "/products.json", "utf-8");
  const result = await fs.readFile(productsPath);
  return JSON.parse(result);
};

const getById = async (id) => {
  const books = await getAll();
  const result = books.find((el) => el.id === id);
  return result ?? null;
};

const add = async ({ model, price }) => {
  const products = await getAll();
  const newProduct = {
    model,
    price,
    id: ObjectID(),
  };
  products.push(newProduct);
  await updateProducts(products);
  return newProduct;
};

const removeById = async (id) => {
  const products = await getAll();
  const idx = products.findIndex((product) => product.id === id);
  if (idx === -1) {
    return null;
  }
  const [result] = products.splice(idx, 1);
  await updateProducts(products);
  return result;
};

module.exports = {
  getAll,
  getById,
  add,
  removeById,
};
