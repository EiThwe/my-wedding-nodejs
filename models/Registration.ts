// models/Registration.js
// @ts-ignore
const mongoose = require("mongoose");
// @ts-ignore
const { Schema } = mongoose;

// Interface for Registration document
/**
 * @typedef {Object} IRegistration
 * @property {string} name
 * @property {string} phone
 * @property {number} noOfGuests
 * @property {'attending' | 'not attending'} status
 * @property {string} [message]
 */

const registrationSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    noOfGuests: {
      type: Number,
      required: [true, "Number of guests is required"],
    },
    status: {
      type: String,
      enum: ["attending", "not attending"],
      required: [true, "Status is required"],
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

// @ts-ignore
const Registration = mongoose.model("Registration", registrationSchema);

// Exporting the Registration model and interface
module.exports = {
  Registration,
  // Note: TypeScript interfaces are not used in CommonJS, but you can export types if needed.
};
