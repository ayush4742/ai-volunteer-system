const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");

// POST - Add problem
router.post("/add", async (req, res) => {
  try {
    const problem = new Problem(req.body);
    await problem.save();
    res.status(201).json({ message: "Problem added", problem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - All problems
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;