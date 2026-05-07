const express = require("express");
const Assessment = require("../models/Assessment");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

const buildRecommendations = (risks = {}) => {
  const recommendations = [];

  if (risks.breastRisk) recommendations.push("Book a clinical breast examination.");
  if (risks.cervicalRisk) recommendations.push("Consider Pap screening or gynecology consultation.");
  if (risks.pcosRisk && risks.pcosRisk !== "low") {
    recommendations.push("Track periods and consult a gynecologist if irregularity continues.");
  }
  if (risks.utiRisk) recommendations.push("Increase water intake and consult a doctor for urinary symptoms.");
  if (risks.mentalRisk) recommendations.push("Talk to someone trusted or a counselor for emotional support.");

  recommendations.push("Maintain a balanced diet, regular sleep, and routine screening.");
  return recommendations;
};

const calculateScore = (risks = {}) => {
  let score = 0;
  if (risks.pcosRisk === "high") score += 30;
  if (risks.pcosRisk === "medium") score += 15;
  if (risks.cervicalRisk) score += 25;
  if (risks.breastRisk) score += 25;
  if (risks.utiRisk) score += 10;
  if (risks.mentalRisk) score += 10;
  return Math.min(score, 100);
};

// Save assessment
router.post("/save", auth, async (req, res) => {
  try {
    const {
      type = "questionnaire",
      summary = "Assessment Completed",
      score,
      risks = {},
      answers = {},
      modelInput = {},
      modelResult = {},
      imageResult = {},
      recommendations,
    } = req.body;

    const finalScore = Number.isFinite(score) ? score : calculateScore(risks);

    const assessment = await Assessment.create({
      userId: req.user.id,
      type,
      summary,
      score: finalScore,
      risks,
      answers,
      modelInput,
      modelResult,
      imageResult,
      recommendations: recommendations?.length ? recommendations : buildRecommendations(risks),
    });

    res.status(201).json({ message: "Assessment saved successfully", assessment });
  } catch (err) {
    res.status(500).json({ message: "Failed to save assessment" });
  }
});

// Get latest assessment (Dashboard)
router.get("/latest", auth, async (req, res) => {
  try {
    const assessment = await Assessment.findOne({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(assessment);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch latest assessment" });
  }
});

router.get("/history", auth, async (req, res) => {
  try {
    const assessments = await Assessment.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ assessments });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch assessment history" });
  }
});

router.get("/stats", auth, async (req, res) => {
  try {
    const assessments = await Assessment.find({ userId: req.user.id }).sort({ createdAt: -1 });
    const latest = assessments[0] || null;
    const highRiskCount = assessments.filter((item) => item.score >= 50).length;
    const averageScore = assessments.length
      ? Math.round(assessments.reduce((sum, item) => sum + (item.score || 0), 0) / assessments.length)
      : 0;

    res.json({
      totalAssessments: assessments.length,
      highRiskCount,
      averageScore,
      latest,
      lastAssessmentDate: latest?.createdAt || null,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch assessment stats" });
  }
});

module.exports = router;
