const Event = require("../models/Event");
const Registration = require("../models/Registration");

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

    const formattedEvents = await Promise.all(
      events.map(async (event) => {
        const totalRegistrations =
          await Registration.countDocuments({
            eventId: event._id,
            status: "ACTIVE",
          });

        return {
          _id: event._id,
          name: event.name,
          totalSeats: event.totalSeats,
          availableSeats: event.availableSeats,
          totalRegistrations,
          eventDate: event.eventDate,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: formattedEvents.length,
      data: formattedEvents,
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