const services = require("../services/contactsServices");

const addContact = async (req, res, next) => {
  try {
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

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    await services.removeContact(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const updatedContact = await services.updateContact(id, body);
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const updateContactStatus = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const contact = await services.updateContactStatus(id, body);
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addContact,
  getContacts,
  getContactById,
  removeContact,
  updateContact,
  updateContactStatus,
};
