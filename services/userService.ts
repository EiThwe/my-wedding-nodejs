// services/userService.js
// @ts-ignore
const User = require("../models/User");

/**
 * @returns {Promise<IUser[]>}
 */
const getUsers = async () => {
  return await User.find();
};

/**
 * @param {IUser} userData
 * @returns {Promise<IUser>}
 */
const createUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

module.exports = {
  getUsers,
  createUser,
};
