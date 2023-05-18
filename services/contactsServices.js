const { createError, getUpdatedError } = require("../helpers");
const Contact = require("../models/contact");

const addContact = async (body) => {
  try {
    const contact = await Contact.create(body);
    return contact;
  } catch (error) {
    throw getUpdatedError(error);
  }
};

const updateContactStatus = async (id, body) => {
  try {
    const contact = await Contact.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!contact) {
      throw createError(404, "Contact not found");
    }
    return contact;
  } catch (error) {
    throw getUpdatedError(error);
  }
};

const getContacts = async () => {
  try {
    const contacts = await Contact.find(null, "-createdAt -updatedAt");
    return contacts;
  } catch (error) {
    throw getUpdatedError(error);
  }
};

const getContactById = async (id) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      throw createError(404, "Contact not found");
    }
    return contact;
  } catch (error) {
    throw getUpdatedError(error);
  }
};

const removeContact = async (id) => {
  try {
    const removedContact = await Contact.findByIdAndRemove(id);
    if (!removedContact) {
      throw createError(404, "Contact not found");
    }
    return removeContact;
  } catch (error) {
    throw getUpdatedError(error);
  }
};

const updateContact = async (id, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updatedContact) {
      throw createError(404, "Contact not found");
    }
  } catch (error) {
    throw getUpdatedError(error);
  }
};

module.exports = {
  addContact,
  updateContactStatus,
  getContacts,
  getContactById,
  removeContact,
  updateContact,
};
