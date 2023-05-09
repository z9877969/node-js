const express = require("express");
const Joi = require("joi");
const Contact = require("../../models/contact");
const { createError, updateStatusContact } = require("../../helpers");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
});

const updatingNameSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contact.find(null, "-createdAt -updatedAt");
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id); // Contact.find({_id: id}) -> [{}] | Contact.findOne({_id: id}) -> {}
    if (!contact) {
      throw createError(404, "Contact not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedContact = await Contact.findByIdAndRemove(id);
    if (!removedContact) {
      throw createError(404, "Contact not found");
    }
    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;

    const { error } = contactSchema.validate(body);
    if (error) {
      throw createError(400, error.message);
    }
    const updatedContact = await Contact.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updatedContact) {
      throw createError(404, "Contact not found");
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/favorite", async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const { error } = updatingNameSchema.validate(body);

    if (!body || error) {
      throw createError(400, "missing field favorite");
    }

    const contact = await updateStatusContact(id, body);
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
