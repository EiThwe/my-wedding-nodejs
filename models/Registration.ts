// models/Registration.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IRegistration extends Document {
  name: string;
  phone: string;
  noOfGuests: number;
  status: "attending" | "not attending";
  message?: string;
  isApproved?: boolean;
}

const registrationSchema: Schema<IRegistration> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    noOfGuests: {
      type: Number,
      required: [true, "Number of guests is required"],
    },
    status: {
      type: String,
      enum: ["attending", "not attending"],
      required: [true, "Status is required"],
    },
    message: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

const Registration = mongoose.model<IRegistration>(
  "Registration",
  registrationSchema
);

export default Registration;
