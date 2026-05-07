const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  languagePreference: {
    type: String,
    enum: ["en", "hi", "mr", "te", "bn"],
    default: "en",
  },
  phone: { type: String, default: "" },
  ageGroup: { type: String, default: "" },
  location: { type: String, default: "" },
  emergencyContact: { type: String, default: "" },
  notificationPreferences: {
    assessmentReminders: { type: Boolean, default: true },
    healthTips: { type: Boolean, default: true },
    appointmentReminders: { type: Boolean, default: true },
  },
  privacySettings: {
    saveAssessmentHistory: { type: Boolean, default: true },
    allowPersonalizedInsights: { type: Boolean, default: true },
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
