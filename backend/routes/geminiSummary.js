const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const aiSafety = require("../middleware/aiSafety");

const geminiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
});

module.exports = (genAI) => {
  router.post(
  "/gemini-summary",
  geminiLimiter,
  aiSafety,
  async (req, res) => {

    const { title, description, language } = req.body;

    if (!title || !description || !language) {
      return res.status(400).json({
        text: "Invalid request data.",
      });
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
     const prompt = `
You are an educational content summarizer.

Your task:
- Summarize the given content in simple language.
- Output only bullet points (minimum 3, maximum 5).
- Use ONLY the requested language strictly.

Rules:
- Do NOT provide medical, legal, or professional advice.
- Do NOT mention diagnosis, treatment, or cures.
- Do NOT add headings, introductions, or explanations.
- Do NOT mention that you are an AI.
- No emojis.

Language rules:
- If the language is unclear or not a real human language, respond EXACTLY with:
  The requested language does not exist.

Requested language:
"${language}"

Content title:
"${title}"

Content description:
"${description}"
`;

const result = await model.generateContent(prompt);
      const text = result.response.text();

      res.json({ text });
    } catch (error) {
      console.error("GEMINI SUMMARY ERROR 👇");
      console.error(error);

      res.status(500).json({
        text: "Unable to generate summary at the moment.",
      });
    }
  });

  return router;
};
