const { createError, getUpdatedError } = require("../helpers");
const Contact = require("../models/contact");
const User = require("../models/user");

const addContact = async (body, user) => {
  try {
    const { _id: owner } = user;
    const contact = await Contact.create({ ...body, owner });
    return contact;
  } catch (error) {
    throw getUpdatedError(error);
  }
};

const updateContactStatus = async ({ id, body, user }) => {
  try {
    const { _id: owner } = user;
    const contact = await Contact.findOneAndUpdate({ _id: id, owner }, body, {
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

const getContacts = async (user) => {
  try {
    const { _id: owner } = user;
    const contacts = await Contact.find({ owner }, "-createdAt -updatedAt");
    // .populate("owner", "_id name email");
    return contacts;
  } catch (error) {
    throw getUpdatedError(error);
  }
};

const getContactById = async ({ id, user }) => {
  try {
    const { _id: owner } = user;
    const contact = await Contact.findOne({ id, owner });
    if (!contact) {
      throw createError(404, "Contact not found");
    }
    return contact;
  } catch (error) {
    throw getUpdatedError(error);
  }
};

const removeContact = async ({ id, user }) => {
  try {
    const { _id: owner } = user;
    const removedContact = await Contact.findOneAndRemove({ _id: id, owner });
    if (!removedContact) {
      throw createError(404, "Contact not found");
    }
    return removeContact;
  } catch (error) {
    throw getUpdatedError(error);
  }
};

const updateContact = async ({ id, body, user }) => {
  try {
    const { _id: owner } = user;
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: id, owner },
      body,
      {
        new: true,
      }
    );
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