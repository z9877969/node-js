const { authorize } = require('./authorize');
const { checkRefreshToken } = require('./checkRefreshToken');
const contactsValidation = require('./contactsValidation');
const usersValidation = require('./usersValidation');
const multerUpload = require('./multerUpload');
const imitateRequest = require('./imitateRequest');

module.exports = {
  authorize,
  contactsValidation,
  usersValidation,
  multerUpload,
  imitateRequest,
  checkRefreshToken,
};
