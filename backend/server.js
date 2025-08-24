import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import mongoose from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const port = process.env.PORT;

connectDB();

const allowedOrigins = ["http://localhost:5173", "http://localhost:8080","https://eduportal-frontend.onrender.com"];
app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the Server!");
});

// Existing routes
app.use("/api/auth", authRouter);

// ---------------- Planner Events Backend ----------------

// Event schema
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  startTime: String,
  endTime: String,
  category: String,
  priority: String,
  status: { type: String, default: "pending" },
  color: String
});

const Event = mongoose.model("Event", eventSchema);

// Fetch all events
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new event
app.post("/api/events", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.json(newEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update event (toggle status, edit)
app.put("/api/events/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete event
app.delete("/api/events/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Google Generative AI ----------------
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
const chat = model.startChat();

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.userMessage;
    const result = await chat.sendMessage(userMessage);

    res.json({
      reply: result.response.text()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
