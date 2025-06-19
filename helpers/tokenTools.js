const jwt = require('jsonwebtoken');
const { createError } = require('./createError');

const { SECRET_KEY, REFRESH_TOKEN_SECRET } = process.env;

const create = (payload, time, tokenType = 'access') => {
  return jwt.sign(
    payload,
    tokenType === 'access' ? SECRET_KEY : REFRESH_TOKEN_SECRET,
    { expiresIn: time }
  );
};

const verify = (token, tokenType = 'access') => {
  try {
    return jwt.verify(
      token,
      tokenType === 'access' ? SECRET_KEY : REFRESH_TOKEN_SECRET
    );
  } catch (error) {
    throw createError(401, 'Not authorized');
  }
};

module.exports = {
  create,
  verify,
};
