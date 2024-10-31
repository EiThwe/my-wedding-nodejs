// services/registrationService.ts
import Registration, { IRegistration } from "../models/Registration";

export const createRegistration = async (
  data: IRegistration
): Promise<IRegistration> => {
  const registration = new Registration(data);
  return await registration.save();
};

export const getRegistrations = async (): Promise<IRegistration[]> => {
  return await Registration.find()
    .select("name message -_id") // Select only `name` and `message` fields
    .sort({ _id: 1 });
};
