const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");

router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find();

    let predictionMap = {};

    problems.forEach((p) => {
      const key = p.location + "-" + p.title.toLowerCase();

      if (!predictionMap[key]) {
        predictionMap[key] = 0;
      }

      predictionMap[key]++;
    });

    let predictions = [];

    for (let key in predictionMap) {
      if (predictionMap[key] >= 2) {
        const [location, issue] = key.split("-");

        predictions.push({
          location,
          issue,
          riskLevel: "High",
          message: `High chance of ${issue} in ${location}`
        });
      }
    }

    res.json({
      predictions,
      status: "Prediction generated successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;