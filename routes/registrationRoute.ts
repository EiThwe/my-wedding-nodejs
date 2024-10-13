// routes/registrationRoute.js
// @ts-ignore
const express = require("express");
const registrationController = require("../controllers/registrationController");

// @ts-ignore
const router = express.Router();

// Route to save registration form data
router.post("/", registrationController.createRegistration);

// Route to get all registrations
router.get("/", registrationController.getRegistrations);

module.exports = router;
