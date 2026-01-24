const User = require("../models/User");
const bcrypt = require("bcryptjs");
const express = require("express")

const app = express();
app.use(cors());
app.use(express.json());

// ===============================
// REGISTER
// ===============================
app.post("/registration", async (req, res) => {
  try {
    0.
    const { name, enrollment, password } = req.body;

    if (!name || !enrollment || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userExists = await User.findOne({ enrollment });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      enrollment,
      password: hashedPassword,
      role: "Student"
    });

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        enrollment: user.enrollment,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



// ===============================
// LOGIN
// ===============================
app.post("/login", async (req, res) => {
  try {
    const { enrollment, password } = req.body;

    console.log("LOGIN REQUEST:", enrollment, password);

    const user = await User.findOne({ enrollment });
    console.log("USER FOUND:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful"
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

