import { Request, Response } from "express";
import * as registrationService from "../services/registrationService";
import asyncHandler from "../utils/asyncHandler";
import { IRegistration } from "../models/Registration";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Setup DOMPurify for server-side use
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export const createRegistration = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    let { name, phone, noOfGuests, status, message } = req.body;

    // Sanitize input data
    name = DOMPurify.sanitize(name);
    phone = DOMPurify.sanitize(phone);
    noOfGuests = parseInt(DOMPurify.sanitize(noOfGuests), 10); // Ensure noOfGuests is an integer
    status = DOMPurify.sanitize(status);
    message = DOMPurify.sanitize(message);

    // Create new registration entry
    const registration: IRegistration =
      await registrationService.createRegistration({
        name,
        phone,
        noOfGuests,
        status,
        message,
      } as IRegistration);

    res.status(201).json(registration);
  }
);

export const getRegistrations = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const registrations = await registrationService.getRegistrations();
    res.status(200).json(registrations);
  }
);
