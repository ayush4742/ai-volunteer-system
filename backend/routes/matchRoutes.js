const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");
const Problem = require("../models/Problem");

router.post("/", async (req, res) => {
  try {
    const { problemId } = req.body;

    const problem = await Problem.findById(problemId);
    const volunteers = await Volunteer.find({ availability: true });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    if (volunteers.length === 0) {
      return res.status(404).json({ message: "No available volunteers" });
    }

    let bestVolunteer = null;
    let bestScore = -1;
    let bestReason = [];
    let bestBreakdown = {};

    volunteers.forEach((v) => {
      let score = 0;
      let reason = [];

      let breakdown = {
        skill: 0,
        location: 0,
        priority: 0,
        rating: 0,
        availability: 0
      };

      const problemText = problem.title.toLowerCase();

      // 🔹 1. Skill Matching
      v.skills.forEach((skill) => {
        if (problemText.includes(skill.toLowerCase())) {
          score += 5;
          breakdown.skill += 5;
          reason.push("skill match");
        }
      });

      // 🔹 2. Location Match
      if (v.location.toLowerCase() === problem.location.toLowerCase()) {
        score += 4;
        breakdown.location += 4;
        reason.push("same location");
      }

      // 🔹 3. Priority Weight
      if (problem.priority === "high") {
        score += 5;
        breakdown.priority += 5;
        reason.push("high priority");
      } else if (problem.priority === "medium") {
        score += 3;
        breakdown.priority += 3;
      } else {
        score += 1;
        breakdown.priority += 1;
      }

      // 🔹 4. Rating Boost
      score += v.rating;
      breakdown.rating += v.rating;

      if (v.rating >= 4) {
        reason.push("high rating");
      }

      // 🔹 5. Availability Bonus
      if (v.availability) {
        score += 2;
        breakdown.availability += 2;
      }

      // 🔥 Best selection
      if (score > bestScore) {
        bestScore = score;
        bestVolunteer = v;
        bestReason = reason;
        bestBreakdown = breakdown;
      }
    });

    // 🎯 Final Clean Response
    res.json({
      problem: problem.title,
      location: problem.location,
      priority: problem.priority,

      assignedVolunteer: bestVolunteer.name,
      volunteerSkills: bestVolunteer.skills,

      score: bestScore,
      breakdown: bestBreakdown,

      reason: "Selected due to " + bestReason.join(", "),

      status: "Volunteer successfully assigned ✅"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;