const services = require("../services/usersServices");

const userRegister = async (req, res, next) => {
  try {
    const user = await services.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
const userLogin = async (req, res, next) => {
  try {
    const userData = await services.loginUser(req.body);
    res.json(userData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userRegister,
  userLogin,
};
