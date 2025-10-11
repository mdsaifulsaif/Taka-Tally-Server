const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      enum: ["income", "expense", "receivable", "payable"],
      required: true,
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
    note: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    partyName: {
      type: String,
      default: null,
    },
    partyContact: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;

// import mongoose from "mongoose";

// const transactionSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     title: {
//       type: String,
//       required: [true, "Title is required"],
//       trim: true,
//     },

//     amount: {
//       type: Number,
//       required: [true, "Amount is required"],
//     },

//     type: {
//       type: String,
//       enum: ["income", "expense", "receivable", "payable"],
//       required: [true, "Transaction type is required"],
//     },

//     category: {
//       type: String,
//       required: [true, "Category is required"],
//       trim: true,
//     },

//     note: {
//       type: String,
//       trim: true,
//     },

//     // 👇 শুধুমাত্র AR/AP এর জন্য extra fields
//     partyName: {
//       type: String,
//       default: null,
//     },
//     partyContact: {
//       type: String,
//       default: null,
//     },
//     status: {
//       type: String,
//       enum: ["pending", "paid"],
//       default: "pending",
//     },

//     date: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

// const transactionModel =
//   mongoose.models.Transaction ||
//   mongoose.model("Transaction", transactionSchema);

// export default transactionModel;
