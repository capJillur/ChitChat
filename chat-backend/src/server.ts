//server.ts

import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { env } from "./config/env";
import app from "./app";

import { connectDB } from "./config/db";
import { registerChatSocket } from "./sockets/chat.socket";



const PORT = env.PORT || 5000;

const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

registerChatSocket(io);
connectDB();

httpServer.listen(PORT, () => {
  console.log(`Horrayyyy server running on port ${PORT}`);
});