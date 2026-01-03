const express = require("express");
const router = express.Router();

module.exports = (genAI) => {
  router.post("/gemini-summary", async (req, res) => {
    const { title, description, language } = req.body;

    if (!title || !description || !language) {
      return res.status(400).json({
        text: "Invalid request data.",
      });
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
     const prompt = `
You are a healthcare information assistant.

Task:
- Write a simple educational summary of the content below
- Use ONLY the requested language (strictly)
- Use bullet points (min 3, max 5)

Rules:
- Do NOT explain or mention the language
- Do NOT add introductions, confirmations, or headings
- Do NOT give medical advice or diagnosis
- No emojis

Language handling:
- If the language name is misspelled, infer the closest valid human language (e.g., "mawathi" → Marathi)
- If no reasonable match exists, respond EXACTLY with:
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
