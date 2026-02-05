const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiRoutes = require("./routes/geminiSummary")(genAI);
app.use("/api", geminiRoutes);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/assessment", require("./routes/assessmentRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
