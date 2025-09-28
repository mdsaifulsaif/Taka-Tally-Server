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

Router.get(
  "/all-transaction",
  UserMiddleWare.authUserMiddleWare,
  transactionController.getAllTransactions
);
Router.get(
  "/all-expeces",
  UserMiddleWare.authUserMiddleWare,
  transactionController.getAllTransactionExpense
);
Router.get(
  "/all-incomes",
  UserMiddleWare.authUserMiddleWare,
  transactionController.getAllTransactionIncome
);

module.exports = Router;
