//chat-backend/src/controllers/message.controller.ts

import { Request, Response } from "express";
import * as MessageService from "../services/message.service";
import { io } from "../server";
import { errorResponse } from "../utils/apiResponse";
import { successResponse } from "../utils/apiResponse";


export const sendMessage = async (
  req: Request,
  res: Response
) => {
  try {
    const { username, message } = req.body;

   


    if (
    !username?.trim() ||
    !message?.trim()
) {
    return errorResponse(
        res,
        400,
        "Username and message are required."
    );
}

    const newMessage = await MessageService.createMessage(
      username,
      message
    );

    io.emit("new-message", newMessage);

    return successResponse(
        res,
        201,
        "Message sent successfully.",
        newMessage
    );
  } catch (error) {
    console.error("[sendMessage Error]",error);

    return errorResponse(
        res,
        500,
        "Internal Server Error"
    );
  }
};

export const getChatHistory = async (
  _req: Request,
  res: Response
) => {
  try {
    const messages = await MessageService.getMessages();

    return successResponse(
        res,
        200,
        "Chat history retrieved successfully.",
        messages
    );
  } catch (error) {
    console.error("[getChatHistory Error]",error);

    return errorResponse(
        res,
        500,
        "Internal Server Error"
    );
  }
};