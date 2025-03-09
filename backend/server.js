import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import speechToTextRoutes from "./routes/speechToText.routes.js";
import speechToTextRecordsRoutes from "./routes/speechtotextrecord.routes.js";
import patientsRoutes from "./routes/patients.routes.js";
import authRoutes from "./routes/auth.routes.js";
import medicationRoutes from "./routes/medication.routes.js";
import medicationScheduleRoutes from "./routes/medicationSchedules.routes.js";
import reminderRoutes from "./routes/reminder.routes.js";
import userRoutes from "./routes/user.routes.js"; // Import user routes (includes registration)
import cors from "cors";
import { registerUser } from "./controllers/user.controllers.js"; // Import the registerUser controller

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Allows us to accept JSON data in the request body
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/speechToText", speechToTextRoutes);
app.use("/api/user", userRoutes); // User routes (now handles registration and other user-related tasks)
app.use("/api/reminder", reminderRoutes);
app.use("/api/medication", medicationRoutes);
app.use("/api/medication-schedule", medicationScheduleRoutes);
app.use("/api/speech-to-text-records", speechToTextRecordsRoutes);

// Registration Route
app.post("/api/register", registerUser); // Use the registerUser controller to handle registration

// Start the server and connect to the database
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
