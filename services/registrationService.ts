// services/registrationService.js
// @ts-ignore
const Registration = require("../models/Registration");

/**
 * @param {IRegistration} data
 * @returns {Promise<IRegistration>}
 */
// @ts-ignore
const createRegistration = async (data) => {
  const registration = new Registration(data);
  return await registration.save();
};

/**
 * @returns {Promise<IRegistration[]>}
 */
// @ts-ignore
const getRegistrations = async () => {
  return await Registration.find();
};

module.exports = {
  createRegistration,
  getRegistrations,
};
