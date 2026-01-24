const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use("/api/books", bookRoutes);
app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});



