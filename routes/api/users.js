const express = require("express");
const controlers = require("../../controlers/usersControlers");
const validation = require("../../middlewares/usersValidation");

const usersRouter = express.Router();

usersRouter.post("/register", validation.registerUser, controlers.userRegister);
usersRouter.post("/login", validation.loginUser, controlers.userLogin);

module.exports = usersRouter;
