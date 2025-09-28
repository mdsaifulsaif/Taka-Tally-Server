const mongoose = require("mongoose");

async function connectDB() {
  try {
    mongoose.connect(
      `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.7t40hc8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Mongodb connected");
  } catch (error) {
    console.error("Mongodb connection error:", error.message);
    throw error;
  }
}

module.exports = connectDB;
