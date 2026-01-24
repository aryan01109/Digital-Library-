const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    enrollment: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["Student", "Admin"],
      default: "Student"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
