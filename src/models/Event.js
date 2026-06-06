const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Event name is required"],
      unique: true,
      trim: true,
    },

    totalSeats: {
      type: Number,
      required: [true, "Total seats are required"],
      min: [1, "Total seats must be greater than 0"],
    },

    availableSeats: {
      type: Number,
      required: true,
    },

    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);