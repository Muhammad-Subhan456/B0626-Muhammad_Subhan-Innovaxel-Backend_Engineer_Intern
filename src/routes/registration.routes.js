const express = require("express");

const {
  registerUser,
  cancelRegistration,
} = require("../controllers/registration.controller");

const router = express.Router();

/**
 * @swagger
 * /api/registrations:
 *   post:
 *     summary: Register a user for an event
 *     tags:
 *       - Registrations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               eventId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registration successful
 */
router.post("/", registerUser);

/**
 * @swagger
 * /api/registrations/{registrationId}:
 *   delete:
 *     summary: Cancel registration
 *     tags:
 *       - Registrations
 *     parameters:
 *       - in: path
 *         name: registrationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registration cancelled
 */
router.delete(
  "/:registrationId",
  cancelRegistration
);

module.exports = router;