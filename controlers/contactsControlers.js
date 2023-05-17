const { createError } = require("../helpers");
const services = require("../services/contactsServices");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
});

const updatingNameSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const addContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const newContact = await services.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const getContacts = async (req, res, next) => {
  try {
    const contacts = await services.getContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = services.getContactById(id);
    res.json(contact);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  addContact,
  getContacts,
  getContactById,
};
