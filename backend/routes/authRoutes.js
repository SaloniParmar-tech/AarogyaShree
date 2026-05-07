const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const createToken = (user) =>
  jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

const toSafeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  languagePreference: user.languagePreference || "en",
  phone: user.phone || "",
  ageGroup: user.ageGroup || "",
  location: user.location || "",
  emergencyContact: user.emergencyContact || "",
  notificationPreferences: user.notificationPreferences,
  privacySettings: user.privacySettings,
  createdAt: user.createdAt,
});

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, languagePreference = "en" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    if (!["en", "hi", "mr", "te", "bn"].includes(languagePreference)) {
      return res.status(400).json({ message: "Invalid language preference" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      languagePreference,
    });

    res.status(201).json({
      token: createToken(user),
      user: toSafeUser(user),
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      token: createToken(user),
      user: toSafeUser(user),
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ user: toSafeUser(user) });
});

router.put("/preference", authMiddleware, async (req, res) => {
  const { languagePreference } = req.body;

  if (!["en", "hi", "mr", "te", "bn"].includes(languagePreference)) {
    return res.status(400).json({ message: "Invalid language preference" });
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { languagePreference },
    { new: true }
  ).select("name email languagePreference");

  res.json({ user: toSafeUser(user) });
});

router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, phone, ageGroup, location, emergencyContact } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: name.trim(),
        phone: phone?.trim() || "",
        ageGroup: ageGroup || "",
        location: location?.trim() || "",
        emergencyContact: emergencyContact?.trim() || "",
      },
      { new: true }
    ).select("-password");

    res.json({ user: toSafeUser(user) });
  } catch (err) {
    res.status(500).json({ message: "Profile update failed" });
  }
});

router.put("/settings", authMiddleware, async (req, res) => {
  try {
    const {
      languagePreference,
      notificationPreferences = {},
      privacySettings = {},
    } = req.body;

    if (languagePreference && !["en", "hi", "mr", "te", "bn"].includes(languagePreference)) {
      return res.status(400).json({ message: "Invalid language preference" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        ...(languagePreference ? { languagePreference } : {}),
        notificationPreferences,
        privacySettings,
      },
      { new: true }
    ).select("-password");

    res.json({ user: toSafeUser(user) });
  } catch (err) {
    res.status(500).json({ message: "Settings update failed" });
  }
});

router.put("/password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Both passwords are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Password update failed" });
  }
});

module.exports = router;
