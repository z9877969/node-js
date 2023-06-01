const Joi = require("joi");
const { createError, regex } = require("../helpers");

const userRegisterSchema = Joi.object({
  email: Joi.string().pattern(regex.email).required(),
  password: Joi.string().min(8).max(32).required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(regex.email).required(),
  password: Joi.string().min(8).max(32).required(),
});

const userSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
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

const validateUpdateUserSubscription = async (req, res, next) => {
  try {
    const { error } = userSubscriptionSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser: validateRegisterUser,
  loginUser: validateLoginUser,
  updateUserSubscription: validateUpdateUserSubscription,
};
