const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");

// POST - Add volunteer
router.post("/register", async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);
    await volunteer.save();
    res.status(201).json({ message: "Volunteer added", volunteer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - All volunteers
router.get("/", async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;