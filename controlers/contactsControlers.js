const services = require("../services/contactsServices");

const addContact = async (req, res, next) => {
  try {
    const newContact = await services.addContact(req.body, req.user);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const getContacts = async (req, res, next) => {
  try {
    const {
      user,
      query: { favorite, limit, page },
    } = req;
    if (favorite) {
      const contacts = await services.filterContactsByFavorite({
        user,
        favorite,
      });
      res.json(contacts);
    }
    if (limit && page) {
      const contacts = await services.paginateContacts({
        user,
        limit,
        page,
      });
      res.json(contacts);
    }
    const contacts = await services.getContacts(user);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const filterContactsByFavorite = async (req, res, next) => {
  try {
    const {
      user,
      query: { favorite },
    } = req;
    if (!favorite) {
      next();
    }
    const contacts = await services.filterContactsByFavorite({
      user,
      favorite,
    });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const paginateContacts = async (req, res, next) => {
  try {
    const {
      user,
      query: { limit, page },
    } = req;
    if (!limit || !page) {
      next();
    }

    const contacts = await services.paginateContacts({ user, page, limit });
    res.json("contacts").status(201);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const {
      user,
      params: { id },
    } = req;
    const contact = await services.getContactById({ id, user });
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const {
      user,
      params: { id },
    } = req;
    await services.removeContact({ id, user });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const {
      body,
      user,
      params: { id },
    } = req;
    const updatedContact = await services.updateContact({ id, body, user });
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const updateContactStatus = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const contact = await services.updateContactStatus({
      id,
      body,
      user: req.user,
    });
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addContact,
  getContacts,
  filterContactsByFavorite,
  getContactById,
  removeContact,
  updateContact,
  updateContactStatus,
  paginateContacts,
};
