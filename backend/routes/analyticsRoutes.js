import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const dataPath = path.resolve("data/students.json");

// GET analytics data
router.get("/", (req, res) => {
  try {
    const rawData = fs.readFileSync(dataPath);
    const students = JSON.parse(rawData);

    const names = students.map(s => s.name);
    const marks = students.map(s => s.marks);

    res.json({
      labels: names,
      scores: marks
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to load analytics data" });
  }
});

export default router;
