const { tokenTools, createError, getUpdatedError } = require("../helpers");
const User = require("../models/user");

const authorize = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw createError(401, "Not authorized");
    }
    try {
      const { id } = tokenTools.verify(token);
      const user = await User.findOne({ _id: id });
      if (!user || !user.token || user.token !== token) {
        throw createError(401, "Not authorized");
      }
      req.user = user;
      next();
    } catch (error) {
      throw getUpdatedError(error);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authorize,
};
