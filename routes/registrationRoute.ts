// routes/registrationRoute.ts
import express from 'express';
import * as registrationController from '../controllers/registrationController';

const router = express.Router();

// Route to save registration form data
router.post('/', registrationController.createRegistration);

// Route to get all registrations
router.get('/', registrationController.getRegistrations);

export default router;
