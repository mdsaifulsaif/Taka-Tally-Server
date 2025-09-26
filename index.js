const app = require("./src/app");
const connectDB = require("./src/db/db");

(async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" DB connection failed:", error.message);
  }
})();
