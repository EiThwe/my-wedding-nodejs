// controllers/registrationController.js
// @ts-ignore
const { Request, Response } = require("express");
const registrationService = require("../services/registrationService");
// @ts-ignore
const asyncHandler = require("../utils/asyncHandler");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

// Setup DOMPurify for server-side use
// @ts-ignore
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

// @ts-ignore
const createRegistration = asyncHandler(async (req, res) => {
  let { name, phone, noOfGuests, status, message } = req.body;

  // Sanitize input data
  name = DOMPurify.sanitize(name);
  phone = DOMPurify.sanitize(phone);
  noOfGuests = parseInt(DOMPurify.sanitize(noOfGuests), 10); // Ensure noOfGuests is an integer
  status = DOMPurify.sanitize(status);
  message = DOMPurify.sanitize(message);

  // Create new registration entry
  const registration = await registrationService.createRegistration({
    name,
    phone,
    noOfGuests,
    status,
    message,
  });

  res.status(201).json(registration);
});

// @ts-ignore
const getRegistrations = asyncHandler(async (req, res) => {
  const registrations = await registrationService.getRegistrations();
  res.status(200).json(registrations);
});

// Exporting the controller functions
module.exports = {
  createRegistration,
  getRegistrations,
};
