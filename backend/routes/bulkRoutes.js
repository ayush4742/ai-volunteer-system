const express = require("express");
const router = express.Router();

const Volunteer = require("../models/Volunteer");
const Problem = require("../models/Problem");

// BULK ADD volunteers
router.post("/volunteers", async (req, res) => {
  try {
    const volunteers = await Volunteer.insertMany(req.body);
    res.json({ message: "Bulk volunteers added", volunteers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// BULK ADD problems
router.post("/problems", async (req, res) => {
  try {
    const problems = await Problem.insertMany(req.body);
    res.json({ message: "Bulk problems added", problems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;