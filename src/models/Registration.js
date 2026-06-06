const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "CANCELLED"],
      default: "ACTIVE",
    },

    registeredAt: {
      type: Date,
      default: Date.now,
    },

    cancelledAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent same user registering twice
registrationSchema.index(
  {
    userName: 1,
    eventId: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model(
  "Registration",
  registrationSchema
);