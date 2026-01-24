const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const connectDB = require("../config/db");
const Book = require("../models/books");

const filePath = path.join(__dirname, "../data/books.json");

async function importBooks() {
  try {
    await connectDB();

    const jsonData = fs.readFileSync(filePath, "utf-8");
    const books = JSON.parse(jsonData);

    await Book.insertMany(books, { ordered: false });

    console.log("Books imported successfully!");
    process.exit();
  } catch (error) {
    console.error("Import failed:", error.message);
    process.exit(1);
  }
}

importBooks();
