const fs = require("fs/promises");
const path = require("path");
const ObjectID = require("bson-objectid");

const pathToContacts = path.join(__dirname, "./contacts.json");
const updateContactsList = async (contacts) =>
  fs.writeFile(pathToContacts, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const contacts = await fs.readFile(pathToContacts);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((el) => el.id === contactId) || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex((el) => el.id === contactId);
  if (contactIdx === -1) return null;

  const removedContact = contacts.splice(contactIdx, 1);
  await updateContactsList(contacts);
  return removedContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: ObjectID() };
  contacts.push(newContact);
  await updateContactsList(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex((el) => el.id === contactId);
  if (contactIdx === -1) return null;
  
  const newContact = { ...body, id: contactId };
  contacts[contactIdx] = newContact;
  await updateContactsList(contacts);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
