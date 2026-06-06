const express = require("express");
const { body } = require("express-validator");

const {
  createEvent,
  getEvents,
} = require("../controllers/event.controller");

const validate = require("../middleware/validate");

const router = express.Router();

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: Events fetched successfully
 */

// GET ALL EVENTS
router.get("/", getEvents);


/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               totalSeats:
 *                 type: integer
 *               eventDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Event created successfully
 */
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