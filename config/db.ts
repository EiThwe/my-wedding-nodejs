// config/db.js
// @ts-ignore
const mongoose = require("mongoose");
// @ts-ignore
const dotenv = require("dotenv");

dotenv.config();

// @ts-ignore
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
