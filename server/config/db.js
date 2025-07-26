const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("🔄 connecting to MongoDB...");
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Mongo connected");
  } catch (err) {
    console.error("❌ Mongo connection failed:", err.message);
    process.exit(1); // Force exit if DB is down
  }
};

module.exports = connectDB;
