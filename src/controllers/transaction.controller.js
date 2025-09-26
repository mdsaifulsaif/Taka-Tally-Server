const transactionModel = require("../models/transaction.model");

// async function transaction(req, res) {
//   try {
//     const userId = req.user._id;
//     const { title, amount, type, category, note, date } = req.body;

//     if (!title || !amount || !type) {
//       return res.status(400).json({ message: "Please input your all info" });
//     }
//     const transaction = await new transactionModel.create({
//       title,
//       amount,
//       type,
//       category,
//       note,
//       date,
//     });
//     res.status(200).json({
//       message: "transaction create successfully",
//       transaction,
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// }

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

module.exports = {
  addTransaction,
};
