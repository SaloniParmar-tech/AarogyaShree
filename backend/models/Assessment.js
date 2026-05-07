const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  type: {
    type: String,
    enum: ["questionnaire", "image", "combined"],
    default: "questionnaire"
  },
  summary: {
    type: String,
    default: "Assessment Completed"
  },
  score: { type: Number, default: 0 },
  risks: {
    pcosRisk: { type: String, default: "low" },
    cervicalRisk: { type: Boolean, default: false },
    breastRisk: { type: Boolean, default: false },
    utiRisk: { type: Boolean, default: false },
    mentalRisk: { type: Boolean, default: false }
  },
  answers: { type: mongoose.Schema.Types.Mixed, default: {} },
  modelInput: { type: mongoose.Schema.Types.Mixed, default: {} },
  modelResult: { type: mongoose.Schema.Types.Mixed, default: {} },
  imageResult: { type: mongoose.Schema.Types.Mixed, default: {} },
  recommendations: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model("Assessment", assessmentSchema);
