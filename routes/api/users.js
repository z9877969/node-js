const express = require("express");
const controlers = require("../../controlers/usersControlers");
const { authorize } = require("../../middlewares/authorize");
const validation = require("../../middlewares/usersValidation");

const usersRouter = express.Router();

usersRouter.post("/register", validation.registerUser, controlers.registerUser);
usersRouter.post("/login", validation.loginUser, controlers.loginUser);
usersRouter.get("/logout", authorize, controlers.logoutUser);
usersRouter.get("/current", authorize, controlers.getCurrentUser);
usersRouter.patch(
  "/subscription",
  authorize,
  validation.updateUserSubscription,
  controlers.updateSubscription
);

module.exports = usersRouter;
