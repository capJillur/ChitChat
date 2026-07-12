import { Message } from "../models/message.model";

export const createMessage = async (
  username: string,
  message: string
) => {
  return await Message.create({
    username,
    message,
  });
};

export const getMessages = async () => {
  return await Message.find()
  .sort({ createdAt: 1 })
  .limit(50);
};