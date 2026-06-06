const Event = require("../models/Event");

const createEvent = async (req, res) => {
  try {
    const { name, totalSeats, eventDate } = req.body;

    if (!name || !totalSeats || !eventDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingEvent = await Event.findOne({ name });

    if (existingEvent) {
      return res.status(400).json({
        success: false,
        message: "Event name already exists",
      });
    }

    const eventDateObj = new Date(eventDate);

    if (eventDateObj <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Event date must be in the future",
      });
    }

    const event = await Event.create({
      name,
      totalSeats,
      availableSeats: totalSeats,
      eventDate,
    });

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getEvents = async (req, res) => {
  try {
    const { upcoming, sort } = req.query;

    let filter = {};

    if (upcoming === "true") {
      filter.eventDate = {
        $gte: new Date(),
      };
    }

    let query = Event.find(filter);

    if (sort === "date") {
      query = query.sort({
        eventDate: 1,
      });
    }

    const events = await query;

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getEvents
};