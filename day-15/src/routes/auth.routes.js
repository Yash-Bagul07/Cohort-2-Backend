const express = require('express');
const authController = require("../controllers/auth.controller")

const authRouter = express.Router();

authRouter.post("/register", authController.registerController)

authRouter.post("/login", authController.loginController)

authRouter.get

module.exports = authRouter;