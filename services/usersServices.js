const { createError, getUpdatedError } = require("../helpers");
const User = require("../models/user");
const { passwordTools, tokenTools } = require("../helpers");

const registerUser = async (body) => {
  try {
    const user = await User.findOne({ email: body.email });
    if (user) {
      throw createError(409, "Email in use");
    }
    const hashedPassword = await passwordTools.createHash(body.password);
    const { email, subscription } = await User.create({
      ...body,
      password: hashedPassword,
    });
    return { user: { email, subscription } };
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
    const { email, subscription } = user;

    return { token, user: { email, subscription } };
  } catch (error) {
    throw getUpdatedError(error);
  }
};

const logoutUser = async (user) => {
  try {
    const { _id } = user;
    await User.findByIdAndUpdate(_id, { token: "" });
    return null;
  } catch (error) {
    throw getUpdatedError(error);
  }
};

const getCurrentUser = async (user) => {
  try {
    const { email, subscription } = user;
    return { email, subscription };
  } catch (error) {
    throw getUpdatedError(error);
  }
};

const updateSubscription = async ({ user, body }) => {
  try {
    const { email, _id, subscription } = await User.findByIdAndUpdate(
      user._id,
      body,
      { new: true }
    );

    return { email, _id, subscription };
  } catch (error) {
    throw getUpdatedError(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
};
