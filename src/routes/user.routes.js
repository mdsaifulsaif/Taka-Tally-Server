const express = require("express");
const Router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleWare = require("../middlewares/authMiddleWare");

Router.post("/register", authController.registerUser);
Router.post("/login", authController.loginUser);
Router.get("/logout", authController.loginOut);
Router.get(
  "/current-user",
  authMiddleWare.authUserMiddleWare,
  authController.currentUser1
);

module.exports = Router;
