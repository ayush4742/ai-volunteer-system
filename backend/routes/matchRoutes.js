const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");
const Problem = require("../models/Problem");
const axios = require("axios");

// 🔧 normalize (for clean comparison)
const normalize = (str) => str?.toLowerCase().trim();

// 🔥 DISTANCE (Haversine)
const getDistance = (a, b) => {
  const toRad = (v) => (v * Math.PI) / 180;

  const [lat1, lon1] = a;
  const [lat2, lon2] = b;

  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const val =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(val));
};

// 🔥 ETA
const getETA = (distance) => {
  const speed = 35; // km/h
  return Math.round((distance / speed) * 60);
};

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

    // 🚨 COORDS CHECK
    if (
      !problem.latitude ||
      !problem.longitude
    ) {
      return res.status(400).json({
        error: "Problem coordinates missing ❌"
      });
    }

    let bestVolunteer = null;
    let bestScore = -1;
    let bestReason = [];
    let bestBreakdown = {};

    volunteers.forEach((v) => {
      if (!v.latitude || !v.longitude) return; // skip invalid

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

      // 🔹 Skill match
      v.skills.forEach((skill) => {
        if (problemText.includes(skill.toLowerCase())) {
          score += 5;
          breakdown.skill += 5;
          reason.push("skill match");
        }
      });

      // 🔹 Location match (string)
      if (normalize(v.location) === normalize(problem.location)) {
        score += 4;
        breakdown.location += 4;
        reason.push("same location");
      }

      // 🔹 Priority
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

      // 🔹 Rating
      score += v.rating;
      breakdown.rating += v.rating;

      if (v.rating >= 4) {
        reason.push("high rating");
      }

      // 🔹 Availability
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

    if (!bestVolunteer) {
      return res.status(404).json({
        error: "No valid volunteer with coordinates ❌"
      });
    }

    console.log("🔥 MATCH RUNNING");
    console.log("Problem:", problem.location);
    console.log("Volunteer:", bestVolunteer.location);

    // 🔥 USE DB COORDS (FINAL FIX)
    const problemCoord = [problem.latitude, problem.longitude];
    const volunteerCoord = [bestVolunteer.latitude, bestVolunteer.longitude];

    console.log("Coords P:", problemCoord);
    console.log("Coords V:", volunteerCoord);

    let distance = null;
    let eta = null;
    let route = [];

    // 🔥 DISTANCE + ETA
    distance = getDistance(volunteerCoord, problemCoord);
    eta = getETA(distance);

    // 🔥 ROUTE (OSRM)
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${volunteerCoord[1]},${volunteerCoord[0]};${problemCoord[1]},${problemCoord[0]}?overview=full&geometries=geojson`;

      console.log("➡️ OSRM URL:", url);

      const response = await axios.get(url);

      const rawRoute = response.data.routes[0].geometry.coordinates;

      // 🔥 convert to [lat, lng] for frontend
      route = rawRoute.map(([lng, lat]) => [lat, lng]);

      console.log("✅ Route points:", route.length);

    } catch (err) {
      console.log("❌ Route error:", err.response?.data || err.message);
    }

    // 🎯 RESPONSE
    res.json({
      problem: problem.title,
      location: problem.location,
      priority: problem.priority,

      assignedVolunteer: bestVolunteer.name,
      volunteerSkills: bestVolunteer.skills,

      score: bestScore,
      breakdown: bestBreakdown,

      reason: "Selected due to " + bestReason.join(", "),

      distance: distance ? `${distance.toFixed(2)} km` : "N/A",
      eta: eta ? `${eta} mins` : "N/A",
      route: route || [],

      status: "Volunteer assigned + route generated ✅"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;