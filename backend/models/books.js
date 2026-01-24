const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    department: {
      type: String,
      required: true,
      index: true,
      trim: true
    },

    // Alias used by frontend sometimes
    category: {
      type: String,
      index: true,
      trim: true
    },

    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    author: {
      type: String,
      required: true,
      index: true,
      trim: true
    },

    publisher: {
      type: String,
      required: true,
      trim: true
    },

    edition: {
      type: String,
      required: true,
      trim: true
    },

    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },

    coverURL: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["Available", "Issued"],
      default: "Available",
      index: true
    },

    issuedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    issuedDate: {
      type: Date,
      default: null
    },

    dueDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// ===============================
// TEXT SEARCH INDEX
// ===============================
bookSchema.index({
  title: "text",
  author: "text",
  publisher: "text"
});

// ===============================
// AUTO SYNC STATUS
// ===============================
bookSchema.pre("save", function (next) {
  if (this.issuedTo) {
    this.status = "Issued";
  } else {
    this.status = "Available";
  }
  next();
});

module.exports = mongoose.model("Book", bookSchema);
