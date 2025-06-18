const getExtension = (fileName) => fileName.split(".").reverse()[0];
const createName = (originalName, newName) => {
  const extension = getExtension(originalName);
  const fileName = newName + "." + extension;
  return fileName;
};
module.exports = {
  getExtension,
  createName,
};
