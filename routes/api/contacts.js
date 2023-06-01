const express = require("express");
const controlers = require("../../controlers/contactsControlers");
const contactsValidation = require("../../middlewares/contactsValidation");

const contactsRouter = express.Router();

contactsRouter.get(
  "/",
  controlers.filterContactsByFavorite,
  controlers.getContacts
);

contactsRouter.get("/:id", controlers.getContactById);

contactsRouter.post("/", contactsValidation.addContact, controlers.addContact);

contactsRouter.delete("/:id", controlers.removeContact);

contactsRouter.put(
  "/:id",
  contactsValidation.updateContact,
  controlers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  contactsValidation.updateContactStatus,
  controlers.updateContactStatus
);

module.exports = contactsRouter;
