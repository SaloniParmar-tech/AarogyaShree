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
    enum: ["en", "hi"],
    default: "en",
  },
});

module.exports = mongoose.model("User", userSchema);
