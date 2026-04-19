const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");
const Problem = require("../models/Problem");
const axios = require("axios");

// 🔹 helper: get coords from location string
const coords = {
  "Area A": [77.5946, 12.9716],
  "Whitefield": [77.7499, 12.9698],
  "HSR Layout": [77.6474, 12.9116],
  "BTM Layout": [77.6101, 12.9166],
  "Electronic City": [77.6603, 12.8456],
  "Indiranagar": [77.6412, 12.9719],
  "Yelahanka": [77.5963, 13.1005],
  "Koramangala": [77.6245, 12.9352],
  "Hebbal": [77.5970, 13.0352],
  "Marathahalli": [77.6974, 12.9591],
};

// 🔹 ETA calc (simple)
const calculateETA = (distanceKm) => {
  const avgSpeed = 35; // km/h (city)
  const minutes = (distanceKm / avgSpeed) * 60;
  return Math.round(minutes);
};

// 🔹 Haversine distance
const distanceKm = (a, b) => {
  const toRad = (d) => (d * Math.PI) / 180;
  const [lon1, lat1] = a;
  const [lon2, lat2] = b;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
};

router.post("/", async (req, res) => {
  try {
    const { problemId } = req.body;

    const problem = await Problem.findById(problemId);
    const volunteers = await Volunteer.find({ availability: true });

    if (!problem) return res.status(404).json({ message: "Problem not found" });
    if (!volunteers.length) return res.status(404).json({ message: "No volunteers" });

    let best = null;
    let bestScore = -1;

    volunteers.forEach((v) => {
      let score = 0;

      const text = problem.title.toLowerCase();

      v.skills.forEach((s) => {
        if (text.includes(s.toLowerCase())) score += 5;
      });

      if (v.location.toLowerCase() === problem.location.toLowerCase()) score += 4;

      score += problem.priority === "high" ? 5 : problem.priority === "medium" ? 3 : 1;

      score += v.rating;
      if (v.availability) score += 2;

      if (score > bestScore) {
        bestScore = score;
        best = v;
      }
    });

    // 🔹 coords
    const pCoord = coords[problem.location];
    const vCoord = coords[best.location];

    // 🔹 distance + ETA
    const dist = distanceKm(vCoord, pCoord);
    const eta = calculateETA(dist);

    // 🔹 route (OSRM free)
    let route = null;
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${vCoord[0]},${vCoord[1]};${pCoord[0]},${pCoord[1]}?overview=full&geometries=geojson`;
      const r = await axios.get(url);
      route = r.data.routes[0].geometry.coordinates;
    } catch (e) {
      route = null;
    }

    // 🔹 (OPTIONAL) notification (mock)
    console.log(`Notify ${best.name}: You are assigned to ${problem.title}`);

    res.json({
      problem: problem.title,
      volunteer: best.name,
      score: bestScore,
      eta: `${eta} mins`,
      distance: `${dist.toFixed(2)} km`,
      route,
      status: "Assigned + Notified ✅",
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;