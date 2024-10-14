// app.js
// @ts-ignore
const express = require("express");
// @ts-ignore
const dotenv = require("dotenv");
// @ts-ignore
const connectDB = require("./config/db");
const registrationRoutes = require("./routes/registrationRoute");
// @ts-ignore
const errorHandler = require("./middlewares/errorHandler");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
// @ts-ignore
const xssClean = require("xss-clean");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// Middleware to sanitize MongoDB queries
app.use(mongoSanitize());

// Middleware to sanitize user input to prevent XSS attacks
app.use(xssClean());

// Routes
app.get("/", (req: any, res: any) => {
  return res.send("Denny and Thwe's wedding");
});
app.use("/api/registrations", registrationRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
