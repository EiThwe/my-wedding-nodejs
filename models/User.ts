// models/User.js
// @ts-ignore
const mongoose = require("mongoose");
// @ts-ignore
const { Schema } = mongoose;

/**
 * @typedef {Object} IUser
 * @property {string} name
 * @property {string} email
 * @property {string} password
 */

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

// @ts-ignore
const User = mongoose.model("User", userSchema);

// Exporting the User model
module.exports = User;
