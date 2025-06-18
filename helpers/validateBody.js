const { createError } = require("./createError");

const validateBody = (schema) => (req, res, next) => {
  try {
    const { body } = req;

    const { error } = schema.validate(body);

    if (!body || error) {
      const message = !body ? 'Body is required' : error.message;
      throw createError(400, message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateBody;
