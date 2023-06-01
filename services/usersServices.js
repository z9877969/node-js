const { createError, getUpdatedError } = require("../helpers");
const User = require("../models/user");
const { passwordTools, tokenTools } = require("../helpers");

const registerUser = async (body) => {
  try {
    const user = await User.findOne({ email: body.email });
    if (user) {
      throw createError(409, "User with such email has already existed");
    }
    const hashedPassword = await passwordTools.createHash(body.password);
    const { _id, name, email } = await User.create({
      ...body,
      password: hashedPassword,
    });
    return { _id, name, email };
  } catch (error) {
    throw getUpdatedError(error);
  }
};

const loginUser = async (body) => {
  try {
    const user = await User.findOne({ email: body.email });

    const isPasswordCompare = user?.password
      ? await passwordTools.compare(body.password, user.password)
      : false;

    if (!user || !isPasswordCompare) {
      throw createError(401, "Email or password is wrong");
    }

    const payload = { id: user._id };
    const token = tokenTools.create(payload, "1h");
    await User.findByIdAndUpdate(user._id, { token });
    const { _id, email, name } = user;

    return { _id, email, name, token };
  } catch (error) {
    throw getUpdatedError(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
