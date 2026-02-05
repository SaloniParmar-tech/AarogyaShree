module.exports = function aiSafety(req, res, next) {
  const { title, description, language } = req.body;

  const text = `${title} ${description}`.toLowerCase();

  const blockedPatterns = [
    /suicide|self harm|kill myself|die/i,
    /treatment|medicine|dosage|cure|diagnose/i,
    /sexual|rape|nude/i,
    /bomb|weapon|attack|terror/i,
    /illegal|drug deal|hack/i,
  ];

  for (let pattern of blockedPatterns) {
    if (pattern.test(text)) {
      return res.status(400).json({
        text: "This request cannot be processed for safety reasons.",
      });
    }
  }

  if (!/^[a-zA-Z\s]{2,20}$/.test(language)) {
    return res.status(400).json({
      text: "Invalid language input.",
    });
  }

  next();
};
