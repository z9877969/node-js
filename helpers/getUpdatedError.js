const { createError } = require("./createError");

const getUpdatedError = (error) => {
  const { message, status = 404 } = error;
  return createError(status, message);
};

module.exports = {
  getUpdatedError,
};
