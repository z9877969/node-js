const Joi = require('joi');
const { createError, validateBody } = require('../helpers');

const contactSchema = Joi.object({
  date: Joi.string().required(),
  descr: Joi.string().required(),
  priority: Joi.string().valid('low', 'medium', 'high'),
  theme: Joi.string().valid('green', 'red', 'orange'),
  isDone: Joi.boolean(),
});

const updatingContactSchema = Joi.object({
  date: Joi.string(),
  descr: Joi.string(),
  priority: Joi.string().valid('low', 'medium', 'high'),
  theme: Joi.string().valid('green', 'red', 'orange'),
  isDone: Joi.boolean(),
});

const updatingContactStatusSchema = Joi.object({
  isDone: Joi.boolean().required(),
});

const filterByQuerySchema = Joi.object({
  favorite: Joi.boolean(),
  page: Joi.number().min(1),
  limit: Joi.number().min(1),
});

const validateAddContact = validateBody(contactSchema);
const validateUpdateContactStatus = validateBody(updatingContactStatusSchema);
const validateContactUpdating = validateBody(updatingContactSchema);

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
  updateContactStatus: validateUpdateContactStatus,
  filterByQuery: validateFilterByQuery,
  updateContact: validateContactUpdating,
};
