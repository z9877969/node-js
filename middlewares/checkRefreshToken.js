const { tokenTools, createError, getUpdatedError } = require('../helpers');
const User = require('../models/user');

const checkRefreshToken = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;

    const [bearer, refreshToken] = authorization.split(' ');

    if (bearer !== 'Bearer' || !refreshToken) {
      throw createError(401, 'Not authorized');
    }
    try {
      const { id } = tokenTools.verify(refreshToken, 'refresh');
      const user = await User.findOne({ _id: id });
      if (!user || !user.refreshToken || user.refreshToken !== refreshToken) {
        throw createError(401, 'Not authorized');
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
  checkRefreshToken,
};
