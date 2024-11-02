// middlewares/recaptchaMiddleware.js

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const verifyRecaptcha = async (req, res, next) => {
  const { token } = req.body; // Assuming the token is sent in the request body

  if (!token) {
    return res.status(400).json({ message: "No reCAPTCHA token provided" });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Use your secret key from environment variables

  console.log("secretKey => ", secretKey);

  try {
    // Verify the token with Google reCAPTCHA
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: secretKey,
          response: token,
        },
      }
    );

    console.log("response => ", response);

    if (!response.data.success) {
      return res.status(400).json({
        message: "reCAPTCHA verification failed",
        errors: response.data["error-codes"],
      });
    }

    // Optionally: you can check the score for further validation (e.g., score >= 0.5)
    const score = response.data.score;
    if (score < 0.5) {
      return res
        .status(400)
        .json({ message: "reCAPTCHA verification failed with low score" });
    }

    // If successful, move to the next middleware/controller
    next();
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default verifyRecaptcha;
