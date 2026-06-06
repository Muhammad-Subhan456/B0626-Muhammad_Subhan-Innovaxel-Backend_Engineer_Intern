const Event = require("../models/Event");
const Registration = require("../models/Registration");

const registerUser = async (req, res) => {
  try {
    const { userName, eventId } = req.body;

    if (!userName || !eventId) {
      return res.status(400).json({
        success: false,
        message: "userName and eventId are required",
      });
    }

    // Check event exists
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Check duplicate registration
    const existingRegistration =
      await Registration.findOne({
        userName,
        eventId,
        status: "ACTIVE",
      });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message:
          "User already registered for this event",
      });
    }

    /*
      IMPORTANT:
      Atomic seat decrement
      Prevents race conditions
    */

    const updatedEvent =
      await Event.findOneAndUpdate(
        {
          _id: eventId,
          availableSeats: { $gt: 0 },
        },
        {
          $inc: { availableSeats: -1 },
        },
        {
          new: true,
        }
      );

    if (!updatedEvent) {
      return res.status(400).json({
        success: false,
        message: "Event is full",
      });
    }

    const registration =
      await Registration.create({
        userName,
        eventId,
      });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: registration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const cancelRegistration = async (req, res) => {
  try {
    const { registrationId } = req.params;

    const registration = await Registration.findById(
      registrationId
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    if (registration.status === "CANCELLED") {
      return res.status(400).json({
        success: false,
        message: "Registration already cancelled",
      });
    }

    registration.status = "CANCELLED";
    registration.cancelledAt = new Date();

    await registration.save();

    await Event.findByIdAndUpdate(
      registration.eventId,
      {
        $inc: { availableSeats: 1 },
      }
    );

    res.status(200).json({
      success: true,
      message: "Registration cancelled",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      status: "ACTIVE",
    }).populate("eventId", "name");

    res.status(200).json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  registerUser,
  cancelRegistration,
  getRegistrations,
};