const jwt = require("jsonwebtoken");
const { createError } = require("./createError");

const { SECRET_KEY } = process.env;

const create = (payload, time) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: time });
};

const verify = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw createError(401, "Not authorized");
  }
};

module.exports = {
  create,
  verify,
};
