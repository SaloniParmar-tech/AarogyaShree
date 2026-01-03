const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const geminiSummaryRoute = require("./routes/geminiSummary");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/sakhi", async (req, res) => {
  try {
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent("Say hello in one sentence.");
    const reply = result.response.text();

    res.json({ reply });
  } catch (error) {
    console.error("REAL GEMINI ERROR 👇");
    console.error(error);
    res.status(500).json({
      reply: "Gemini test failed",
    });
  }
});
app.use("/api", geminiSummaryRoute(genAI));

app.listen(5000, () => {
  console.log("✅ Gemini backend running on http://localhost:5000");
});
