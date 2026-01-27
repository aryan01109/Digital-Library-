import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const filePath = path.resolve("data/reading.json");

// 👉 GET all students reading data
router.get("/", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath));

    const formatted = data.map(student => ({
      name: student.name,
      books: student.books,
      count: student.books.length
    }));

    res.json(formatted);

  } catch (err) {
    res.status(500).json({ error: "Unable to load analytics" });
  }
});


// 👉 GET particular student analytics
router.get("/:name", (req, res) => {

  try {
    const data = JSON.parse(fs.readFileSync(filePath));

    const student = data.find(
      s => s.name.toLowerCase() === req.params.name.toLowerCase()
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      name: student.name,
      books: student.books,
      count: student.books.length
    });

  } catch (err) {
    res.status(500).json({ error: "Error reading data" });
  }
});

export default router;
