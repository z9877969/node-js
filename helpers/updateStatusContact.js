const Contact = require("../models/contact");
const { createError } = require("./createError");

const updateStatusContact = async (id, body) => {
  try {
    const contact = await Contact.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!contact) {
      throw createError(404, "Contact not found");
    }
    return contact;
  } catch (error) {
    throw createError(404, error.message);
  }
};

module.exports = { updateStatusContact };
