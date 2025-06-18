const services = require("../services/usersServices");

const registerUser = async (req, res, next) => {
  try {
    const user = await services.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await services.loginUser(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    await services.logoutUser(req.user);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await services.getCurrentUser(req.user);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const { user, body } = req;
    const userData = await services.updateSubscription({ user, body });
    res.json(userData);
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { user, file } = req;
    const userData = await services.updateAvatar({ user, file });
    res.json(userData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
};
