const express = require("express");
const controlers = require("../../controlers/contactsControlers");

const contactsRouter = express.Router();

contactsRouter.get("/", controlers.getContacts);

contactsRouter.get("/:id", controlers.getContactById);

contactsRouter.post("/", controlers.addContact);

contactsRouter.delete("/:id", controlers.removeContact);

contactsRouter.put("/:id", controlers.updateContact);

contactsRouter.patch("/:id/favorite", controlers.updateContactStatus);

module.exports = contactsRouter;
