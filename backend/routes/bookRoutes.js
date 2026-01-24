const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  searchBooks,
  toggleBookStatus
} = require("../controllers/bookController");

// ===============================
// BOOK ROUTES
// ===============================

// GET → /api/books?page=1&limit=20
router.get("/", getAllBooks);

// GET → /api/books/search?q=...&category=...&department=...
router.get("/search", searchBooks);

// PUT → /api/books/:id/toggle
router.put("/:id/toggle", toggleBookStatus);

module.exports = router;
