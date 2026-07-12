import api from "./axios";
import type { Message } from "../types/message";

export const getMessages = async (): Promise<Message[]> => {
  const response = await api.get("/messages");
  return response.data.data;
};

export const sendMessage = async (
  username: string,
  message: string
): Promise<Message> => {
  const response = await api.post("/messages", {
    username,
    message,
  });

  return response.data.data;
};