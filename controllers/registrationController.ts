import { Request, Response } from "express";
import * as registrationService from "../services/registrationService";
import asyncHandler from "../utils/asyncHandler";
import { IRegistration } from "../models/Registration";
import { decryptor, encryptor } from "../lib/encryption";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Setup DOMPurify for server-side use
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export const createRegistration = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { iv, encryptedData } = req.body;

      // Decrypt the incoming data
      const decryptedData = decryptor(iv, encryptedData);

      // Extract and sanitize the decrypted data
      let { name, phone, noOfGuests, status, message } = decryptedData as any;

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
    } catch (error) {
      console.error("Decryption error:", error);
      res.status(400).json({ message: "Invalid data." });
    }
  }
);

export const getRegistrations = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const registrations = await registrationService.getRegistrations();
    // Encrypt the registrations data
    const { iv, encryptedData } = encryptor(registrations);

    // Send the encrypted data in the response
    res.status(200).json({ iv, encryptedData });
  }
);
