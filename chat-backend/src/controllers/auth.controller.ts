import { Request, Response } from "express";
import { User } from "../models/user.model";
import { errorResponse, successResponse } from "../utils/apiResponse";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username?.trim() || !email?.trim() || !password?.trim()) {
      return errorResponse(res, 400, "Username, email, and password are required.");
    }

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return errorResponse(res, 409, "Username or email already exists.");
    }

    const user = await User.create({ username, email, password });
    return successResponse(res, 201, "User registered successfully.", {
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    return errorResponse(res, 500, "Could not register user.");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername?.trim() || !password?.trim()) {
      return errorResponse(res, 400, "Email/username and password are required.");
    }

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user || user.password !== password) {
      return errorResponse(res, 401, "Invalid credentials.");
    }

    return successResponse(res, 200, "Login successful.", {
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    return errorResponse(res, 500, "Could not log in.");
  }
};

export const getUserCount = async (_req: Request, res: Response) => {
  try {
    const count = await User.countDocuments();
    return successResponse(res, 200, "User count retrieved.", { count });
  } catch (error) {
    return errorResponse(res, 500, "Could not retrieve user count.");
  }
};
