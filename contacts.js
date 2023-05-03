const fs = require("fs/promises");
const path = require("path");
const ObjectID = require("bson-objectid");

const contactsPath = path.join(__dirname, "./db/contacts.json");
const updateContactsDB = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// TODO: задокументувати кожну функцію
async function listContacts() {
  const contacts = await fs.readFile(contactsPath);

  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((el) => el.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex((el) => el.id === contactId);
  if (contactIdx === -1) return null;
  const removedContact = contacts.splice(contactIdx, 1)[0];
  updateContactsDB(contacts);
  return removeContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: ObjectID() };
  contacts.push(newContact);
  updateContactsDB(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
