const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");
const Problem = require("../models/Problem");

router.get("/", async (req, res) => {
  try {
    const totalVolunteers = await Volunteer.countDocuments();
    const totalProblems = await Problem.countDocuments();
    const availableVolunteers = await Volunteer.countDocuments({
      availability: true
    });

    const highPriorityProblems = await Problem.countDocuments({
      priority: "high"
    });

    res.json({
      totalVolunteers,
      totalProblems,
      availableVolunteers,
      highPriorityProblems,

      message: "Dashboard data fetched successfully 🚀"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;