const Joi = require("joi");
const { createError, regex } = require("../helpers");

const userRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(32).required(),
  email: Joi.string().pattern(regex.email).required(),
  password: Joi.string().min(8).max(32).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(regex.email).required(),
  password: Joi.string().min(8).max(32).required(),
});

const validateRegisterUser = async (req, res, next) => {
  const { body } = req;

  try {
    const { error } = userRegisterSchema.validate(body);
    if (error) {
      throw createError(400, error.message);
    }
    next();
  } catch (err) {
    next(err);
  }
};

const validateLoginUser = async (req, res, next) => {
  const { body } = req;

  try {
    const { error } = userLoginSchema.validate(body);
    if (error) {
      throw createError(400, error.message);
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser: validateRegisterUser,
  loginUser: validateLoginUser,
};