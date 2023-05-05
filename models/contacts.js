const fs = require("fs/promises");

const pathToContacts = __dirname + "./contacts.json";

const listContacts = async () => {
  const contacts = await fs.readFile(pathToContacts);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((el) => el.id === contactId) || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex((el) => el.id === contactId);
  if (contactIdx !== -1) return null;
  const removedContact = contacts.splice(contactIdx, 1);
  await fs.writeFile(pathToContacts, contacts);
  return removedContact;
};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
