// @ts-ignore
const express = require("express");
// @ts-ignore
const userController = require("../controllers/userController");

// @ts-ignore
const router = express.Router();

router.get("/", userController.getUsers);
router.post("/", userController.createUser);

module.exports = router;
