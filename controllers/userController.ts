// controllers/userController.ts
import { Request, Response } from "express";
import * as userService from "../services/userService";

import { IUser } from "../models/User";
import asyncHandler from "../utils/asyncHandler";

export const getUsers = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const users: IUser[] = await userService.getUsers();
    res.status(200).json(users);
  }
);

export const createUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user: IUser = await userService.createUser(req.body);
    res.status(201).json(user);
  }
);
