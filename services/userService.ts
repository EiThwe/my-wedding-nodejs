// services/userService.ts
import User, { IUser } from '../models/User';

export const getUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

export const createUser = async (userData: IUser): Promise<IUser> => {
  const newUser = new User(userData);
  return await newUser.save();
};
