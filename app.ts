// app.ts
import express, { Application } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import registrationRoutes from "./routes/registrationRoute";
import errorHandler from "./middlewares/errorHandler";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors"; // Import the cors package
// @ts-ignore
import xssClean from "xss-clean";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app: Application = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://www.dennyandthwe.com", // Production domain
  "https://dennyandthwe.com", // Production domain
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true, // Allow cookies to be sent
};

// Middleware to enable CORS
app.use(cors(corsOptions)); // Enable CORS with the specified options

// Middleware to parse JSON
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
