const express = require("express");
const Assessment = require("../models/Assessment");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Save assessment
router.post("/save", auth, async (req, res) => {
  const { summary, score } = req.body;

  const assessment = await Assessment.create({
    userId: req.user.id,
    summary,
    score
  });

  res.json({ message: "Assessment saved successfully" });
});

// Get latest assessment (Dashboard)
router.get("/latest", auth, async (req, res) => {
  const assessment = await Assessment.findOne({
    userId: req.user.id
  }).sort({ createdAt: -1 });

  res.json(assessment);
});

module.exports = router;
