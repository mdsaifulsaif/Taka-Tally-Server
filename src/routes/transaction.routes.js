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
Router.patch(
  "/:id",
  UserMiddleWare.authUserMiddleWare,
  transactionController.updateTransaction
);
Router.delete(
  "/:id",
  UserMiddleWare.authUserMiddleWare,
  transactionController.deleteTransaction
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
Router.get(
  "/all-receivable",
  UserMiddleWare.authUserMiddleWare,
  transactionController.getAllTransactionAR
);
Router.put(
  "/update-status/:id",
  UserMiddleWare.authUserMiddleWare,
  transactionController.updateStatus
);

module.exports = Router;
