const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");
const axios = require("axios");

// 🔥 SAME FUNCTION AS PROBLEM ROUTE
const getCoordinates = async (location) => {
  try {
    const res = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: location + ", India",   // 🔥 IMPORTANT FIX
        format: "json",
        limit: 1
      },
      headers: {
        "User-Agent": "ai-crisis-app"
      }
    });

    if (!res.data || res.data.length === 0) return null;

    return {
      latitude: parseFloat(res.data[0].lat),
      longitude: parseFloat(res.data[0].lon),
    };

  } catch (err) {
    console.log("Geocoding error:", err.message);
    return null;
  }
};

// ✅ REGISTER VOLUNTEER
router.post("/register", async (req, res) => {
  try {
    const { name, location, skills, availability, rating } = req.body;

    // 🔥 GET COORDS
    const coords = await getCoordinates(location);

    if (!coords) {
      return res.status(400).json({
        error: "Invalid location"
      });
    }

    const volunteer = new Volunteer({
      name,
      location,
      skills,
      availability,
      rating,
      latitude: coords.latitude,
      longitude: coords.longitude
    });

    await volunteer.save();

    res.json({
      message: "Volunteer added with coordinates ✅",
      volunteer
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  const volunteers = await Volunteer.find();
  res.json(volunteers);
});

module.exports = router;