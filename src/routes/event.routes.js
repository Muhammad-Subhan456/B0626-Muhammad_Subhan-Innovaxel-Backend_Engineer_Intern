const express = require("express");
const { body } = require("express-validator");

const {
  createEvent,
  getEvents,
} = require("../controllers/event.controller");

const validate = require("../middleware/validate");

const router = express.Router();

// GET ALL EVENTS
router.get("/", getEvents);

// CREATE EVENT
router.post(
  "/",
  [
    body("name")
      .notEmpty()
      .withMessage("Event name is required"),

    body("totalSeats")
      .isInt({ min: 1 })
      .withMessage("Total seats must be greater than 0"),

    body("eventDate")
      .isISO8601()
      .withMessage("Valid event date is required"),
  ],
  validate,
  createEvent
);

module.exports = router;