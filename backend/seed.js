const mongoose = require("mongoose");
const Book = require("./models/books");

mongoose.connect("mongodb://127.0.0.1:27017/library");

const books = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    edition: "1st",
    publisher: "Prentice Hall",
    department: "Computer Science",
    category: "Computer Science",
    coverURL: "https://dummyimage.com/200x300/cccccc/000000&text=Clean+Code",
    status: "Available"
  },
  {
    title: "Artificial Intelligence Basics",
    author: "Andrew Ng",
    isbn: "9780136042594",
    edition: "2nd",
    publisher: "Pearson",
    department: "Artificial Intelligence and Machine Learning",
    category: "Artificial Intelligence and Machine Learning",
    coverURL: "https://dummyimage.com/200x300/cccccc/000000&text=AI+Book",
    status: "Available"
  },
  {
    title: "Digital Electronics",
    author: "Morris Mano",
    isbn: "9780132543267",
    edition: "3rd",
    publisher: "Pearson",
    department: "Electronics",
    category: "Electronics",
    coverURL: "https://dummyimage.com/200x300/cccccc/000000&text=Electronics",
    status: "Available"
  }
];

async function seed() {
  try {
    await Book.insertMany(books);
    console.log("✅ Books inserted successfully");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    process.exit();
  }
}

seed();
