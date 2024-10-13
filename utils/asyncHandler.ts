// utils/asyncHandler.js
// @ts-ignore
const { Request, Response, NextFunction } = require("express");

/**
 * @param {function(Request, Response, NextFunction): Promise<void>} fn - The async function to handle.
 * @returns {function(Request, Response, NextFunction)} - The wrapped async function.
 */
// @ts-ignore
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
