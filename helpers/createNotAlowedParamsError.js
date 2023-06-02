const { createError } = require("./createError");

const createNotAlowedParamsError = (notAlowedParams, ...alowedParams) => {
  return createError(
    400,
    `Params: [${notAlowedParams}] - not alowed with [${alowedParams}] params`
  );
};

module.exports = {
  createNotAlowedParamsError,
};
