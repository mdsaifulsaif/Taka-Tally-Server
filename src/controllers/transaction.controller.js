const transactionModel = require("../models/transaction.model");

async function addTransaction(req, res) {
  try {
    const userId = req.user._id;
    const { title, amount, type, category, note, date } = req.body;

    if (!title || !amount || !type || !category) {
      return res.status(400).json({ message: "সব প্রয়োজনীয় তথ্য দিন!" });
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
    res
      .status(500)
      .json({ message: "Transaction save করতে সমস্যা হচ্ছে", error });
  }
}

async function getSummary(req, res) {
  try {
    const incomeAgg = await transactionModel.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
    ]);

    const expenseAgg = await transactionModel.aggregate([
      { $match: { type: "expense" } },
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
module.exports = {
  addTransaction,
  getSummary,
};
