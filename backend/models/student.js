import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    rollNo: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    department: String,
    year: Number,
    email: String
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
