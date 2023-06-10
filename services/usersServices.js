const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { createError, getUpdatedError, fileTools } = require("../helpers");
const User = require("../models/user");
const { passwordTools, tokenTools } = require("../helpers");

const registerUser = async (body) => {
  try {
    const user = await User.findOne({ email: body.email });
    if (user) {
      throw createError(409, "Email in use");
    }
    const hashedPassword = await passwordTools.createHash(body.password);
    const avatarURL = gravatar.url(body.email, { protocol: "https" });
    const { email, subscription } = await User.create({
      ...body,
      avatarURL,
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

const updateAvatar = async ({ user, file }) => {
  try {
    const { originalname, path: tmpDir } = file;
    const fileName = fileTools.createName(originalname, user._id);

    const body = { avatarURL: path.join("/avatars", fileName) };
    const newAvatar = await User.findByIdAndUpdate(user._id, body, {
      new: true,
    });
    const avatarDir = path.join(
      __dirname,
      "../",
      "public",
      "avatars",
      fileName
    );

    Jimp.read(tmpDir, (err, avatar) => {
      if (err) throw err;
      avatar
        .resize(250, 250) // resize
        .quality(60) // set JPEG quality
        .write(avatarDir); // save
    });
    await fs.unlink(tmpDir, (err) => {
      if (err)
        throw createError(
          400,
          "Avatar has replaced but TmpDir has not cleared"
        );
      console.log("Avatar has replaced and TmpDir has cleared");
    });

    return { avatarURL: newAvatar.avatarURL };
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
  updateAvatar,
};
