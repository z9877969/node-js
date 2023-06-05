const Joi = require("joi");
const { createError } = require("../helpers");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updatingContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const filterByQuerySchema = Joi.object({
  favorite: Joi.boolean(),
  page: Joi.number().min(1),
  limit: Joi.number().min(1),
});

const validateAddContact = (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validateUpdateContactStatus = (req, res, next) => {
  try {
    const { body } = req;

    const { error } = updatingContactStatusSchema.validate(body);

    if (!body || error) {
      throw createError(400, "missing field favorite");
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validateFilterByQuery = (req, res, next) => {
  try {
    const { query } = req;
    const { error } = filterByQuerySchema.validate(query);
    if (error) {
      throw createError(400, error.message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addContact: validateAddContact,
  updateContact: validateAddContact,
  updateContactStatus: validateUpdateContactStatus,
  filterByQuery: validateFilterByQuery,
};
