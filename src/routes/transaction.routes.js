const express = require("express");
const transactionController = require("../controllers/transaction.controller");
const UserMiddleWare = require("../middlewares/authMiddleWare");
const Router = express.Router();

Router.post(
  "/create",
  UserMiddleWare.authUserMiddleWare,
  transactionController.addTransaction
);
Router.get(
  "/summary",
  UserMiddleWare.authUserMiddleWare,
  transactionController.getSummary
);

module.exports = Router;
