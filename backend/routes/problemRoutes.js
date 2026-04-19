const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");
const axios = require("axios");

// 🔥 fallback (hackathon-safe)
const fallbackCoords = {
  "Delhi India": { latitude: 28.6139, longitude: 77.2090 },
  "Gurgaon India": { latitude: 28.4595, longitude: 77.0266 },
  "Mumbai India": { latitude: 19.0760, longitude: 72.8777 },
  "Pune India": { latitude: 18.5204, longitude: 73.8567 },
};

// 🔥 geocoding function
const getCoordinates = async (location) => {
  try {
    const res = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: { q: location, format: "json", limit: 1 },
      headers: {
        "User-Agent": "ai-volunteer-system",
        "Accept-Language": "en",
      },
      timeout: 5000,
    });

    if (res.data && res.data.length > 0) {
      return {
        latitude: parseFloat(res.data[0].lat),
        longitude: parseFloat(res.data[0].lon),
      };
    }

    return null;

  } catch (e) {
    console.log("Geocode failed:", e.response?.status || e.message);
    return null;
  }
};

// ✅ POST - Add problem
router.post("/add", async (req, res) => {
  try {
    const { title, location, priority } = req.body;

    let coords = await getCoordinates(location);

    // 🔥 fallback if API fails
    if (!coords) {
      coords = fallbackCoords[location] || null;
    }

    // ❗ अगर coords नहीं मिले
    if (!coords) {
      return res.status(400).json({
        error: "Invalid location. Use 'Delhi India', 'Mumbai India', etc."
      });
    }

    const problem = new Problem({
      title,
      location,
      priority,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });

    await problem.save();

    res.status(201).json({
      message: "Problem added with coordinates ✅",
      problem,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET all problems
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;