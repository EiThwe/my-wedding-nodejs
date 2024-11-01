// lib/encryption.ts
import crypto from "crypto";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Load the encryption key from environment variables
const key = Buffer.from(process.env.ENCRYPTION_KEY || "", "utf-8");
const algorithm = "aes-256-cbc";

// Function to encrypt an object
export const encryptor = (
  obj: object
): { iv: string; encryptedData: string } => {
  const iv = crypto.randomBytes(16); // Generate a random initialization vector
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const jsonString = JSON.stringify(obj); // Convert object to JSON string
  let encrypted = cipher.update(jsonString, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return {
    iv: iv.toString("hex"), // Return IV along with encrypted data
    encryptedData: encrypted,
  };
};

// Function to decrypt an encrypted object
export const decryptor = (iv: string, encryptedData: string): object => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return JSON.parse(decrypted); // Convert decrypted JSON string back to object
};
