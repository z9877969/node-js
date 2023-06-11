const { authorize } = require("./authorize");
const contactsValidation = require("./contactsValidation");
const usersValidation = require("./usersValidation");
const multerUpload = require("./multerUpload");

module.exports = {
  authorize,
  contactsValidation,
  usersValidation,
  multerUpload,
};
