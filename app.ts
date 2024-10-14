// app.ts
import express, { Application } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import registrationRoutes from "./routes/registrationRoute";
import errorHandler from "./middlewares/errorHandler";
import mongoSanitize from "express-mongo-sanitize";
import cors from 'cors';
// @ts-ignore
import xssClean from "xss-clean";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app: Application = express();

// Middleware to parse JSON
app.use(cors());
app.use(express.json());


// Middleware to sanitize MongoDB queries
app.use(mongoSanitize());

// Middleware to sanitize user input to prevent XSS attacks
app.use(xssClean());

// Routes
app.use("/api/registrations", registrationRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
