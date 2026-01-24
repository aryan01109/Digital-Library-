const mongoose = require("mongoose");
const Book = require("../models/books");

// ===============================
// GET ALL BOOKS (with optional pagination)
// ===============================
exports.getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;

    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await Book.countDocuments();

    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      books
    });

  } catch (error) {
    console.error("Get books error:", error);
    res.status(500).json({
      message: "Failed to fetch books",
      error: error.message
    });
  }
};

// ===============================
// SEARCH BOOKS
// ===============================
exports.searchBooks = async (req, res) => {
  try {
    const { q, category, department } = req.query;

    let query = {};

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { author: { $regex: q, $options: "i" } }
      ];
    }

    if (category && category !== "All") {
      query.category = category;
    }

    if (department && department !== "All") {
      query.department = department;
    }

    const books = await Book.find(query)
      .sort({ createdAt: -1 })
      .lean();

    res.json(books);

  } catch (error) {
    console.error("Search books error:", error);
    res.status(500).json({
      message: "Failed to search books",
      error: error.message
    });
  }
};

// ===============================
// TOGGLE STATUS
// ===============================
exports.toggleBookStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate Mongo ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid book id"
      });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    book.status =
      book.status === "Available"
        ? "Issued"
        : "Available";

    await book.save();

    res.json({
      message: "Book status updated successfully",
      book
    });

  } catch (error) {
    console.error("Toggle status error:", error);
    res.status(500).json({
      message: "Failed to update book status",
      error: error.message
    });
  }
};
