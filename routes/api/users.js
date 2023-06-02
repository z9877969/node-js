const express = require("express");
const upload = require("../../middlewares/upload");
const services = require("../../services/users");

const usersRouter = express.Router();

usersRouter.post("/register", async (req, res, next) => {
  try {
    const user = await services.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.patch(
  "/:userId/avatar",
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      console.log(req.file);
      const avatar = await services.updateAvatar(userId, req.file);
      console.log(avatar);
      res.json(avatar);
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await services.getUser(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
