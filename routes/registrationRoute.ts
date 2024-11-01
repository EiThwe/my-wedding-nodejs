// routes/registrationRoute.ts
import express from "express";
import * as registrationController from "../controllers/registrationController";
import verifyRecaptcha from "../middlewares/verify-recaptcha";

const router = express.Router();

// Route to save registration form data
router.post("/", verifyRecaptcha, registrationController.createRegistration);

// Route to get all registrations
router.get("/", registrationController.getRegistrations);

export default router;
