const bcrypt = require("bcryptjs");

const createHash = async (password) => {
  return await bcrypt.hash(password, 10);
};

const compare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  createHash,
  compare,
};
