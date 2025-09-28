const transactionModel = require("../models/transaction.model");
const mongoose = require("mongoose");

async function addTransaction(req, res) {
  try {
    const userId = req.user._id;

    const { title, amount, type, category, note, date } = req.body;

    if (!title || !amount || !type || !category) {
      return res.status(400).json({ message: "please input your info" });
    }

    const transaction = new transactionModel({
      title,
      amount,
      type,
      category,
      note,
      date,
      userId,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Transaction save not Save", error });
  }
}

async function getSummary(req, res) {
  const userId = req.user._id;

  try {
    const incomeAgg = await transactionModel.aggregate([
      { $match: { type: "income", userId: userId } },
      { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
    ]);

    const expenseAgg = await transactionModel.aggregate([
      { $match: { type: "expense", userId: userId } },
      { $group: { _id: null, totalExpense: { $sum: "$amount" } } },
    ]);

    const totalIncome = incomeAgg[0]?.totalIncome || 0;
    const totalExpense = expenseAgg[0]?.totalExpense || 0;
    const balance = totalIncome - totalExpense;

    res.status(200).json({ totalIncome, totalExpense, balance });
  } catch (error) {
    res.status(500).json({ message: "Summary not work", error });
  }
}

async function getAllTransactions(req, res) {
  const userId = req.user.id;

  const statements = await transactionModel.find({ userId: userId });

  res.status(200).json({
    message: "fatched user all transactions succfully",
    statements,
  });
}

async function getAllTransactionExpense(req, res) {
  const userId = req.user.id;

  const expenses = await transactionModel.find({
    userId: userId,
    type: "expense",
  });

  res.status(200).json({
    message: "All Transaction Expense ",
    expenses,
  });
}

async function getAllTransactionIncome(req, res) {
  const userId = req.user.id;

  try {
    const incomes = await transactionModel.find({
      userId: userId,
      type: "income",
    });

    res.status(200).json({
      message: "All Transaction Expenses fetched successfully",
      incomes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch expenses",
      error: err.message,
    });
  }
}

module.exports = {
  addTransaction,
  getSummary,
  getAllTransactions,
  getAllTransactionExpense,
  getAllTransactionIncome,
};
