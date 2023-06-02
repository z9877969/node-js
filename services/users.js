const fs = require("fs/promises");
const path = require("path");
// const { nanoid } = require("nanoid");
const gravatar = require("gravatar");

const pathToUsers = path.join(__dirname, "../", "data", "users.json");
const getUsers = async () => {
  const usersList = await fs.readFile(pathToUsers);
  return JSON.parse(usersList);
};
const setUsers = async (users) => {
  await fs.writeFile(pathToUsers, JSON.stringify(users, null, 2));
};

const createError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

const registerUser = async (body) => {
  try {
    const users = await getUsers();
    const { email, password } = body;
    const avatarURL = gravatar.url(email);

    const user = { email, password, id: Date.now(), avatarURL };
    users.push(user);
    await setUsers(users);
    return user;
  } catch (error) {
    throw createError(400, error.message);
  }
};

const updateAvatar = async (userId, file) => {
  try {
    const { originalname, path: fileDir } = file;
    const [extension] = originalname.split(".").reverse();
    const avatarDir = path.join(
      __dirname,
      "../",
      "public",
      "avatars",
      `${userId}.${extension}`
    );
    await fs.rename(fileDir, avatarDir);

    const users = await getUsers();
    const userIdNum = Number(userId);
    const userIdx = users.findIndex(({ id }) => id === userIdNum);
    if (userIdx === -1) {
      throw createError(404, "User not found");
    }
    const avatarURL = path.join("avatars", `${userId}.${extension}`);
    users[userIdx].avatarURL = avatarURL;
    setUsers(users);
    return { avatarURL };
  } catch (error) {
    throw error;
  }
};

const getUser = async (id) => {
  try {
    const users = await getUsers();
    const user = users.find((el) => el.id === Number(id));
    if (!user) {
      throw createError(404, "User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUser,
  updateAvatar,
  getUser,
};
