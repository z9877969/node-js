const express = require("express");
const controlers = require("../../controlers/contactsControlers");
const contactsValidation = require("../../middlewares/contactsValidation");

const contactsRouter = express.Router();

contactsRouter.get(
  "/",
  contactsValidation.filterByQuery,
  controlers.filterContactsByFavorite,
  controlers.paginateContacts,
  controlers.getContacts
);

contactsRouter.get("/:id", controlers.getContactById);

contactsRouter.post("/", contactsValidation.addContact, controlers.addContact);

contactsRouter.delete("/:id", controlers.removeContact);

contactsRouter.patch(
  "/:id",
  contactsValidation.updateContact,
  controlers.updateContact
);

contactsRouter.patch(
  "/:id/status",
  contactsValidation.updateContactStatus,
  controlers.updateContactStatus
);

module.exports = contactsRouter;
