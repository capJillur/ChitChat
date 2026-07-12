import { Server, Socket } from "socket.io";

let onlineUsers = 0;

const broadcastOnlineCount = (io: Server) => {
  io.emit("online-users", { count: onlineUsers });
};

export const registerChatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
        console.log(`🟢 User Connected: ${socket.id}`);
    onlineUsers += 1;
    broadcastOnlineCount(io);

    socket.on("user-typing", (payload: { username: string }) => {
      if (!payload?.username?.trim()) return;

      socket.broadcast.emit("user-typing", {
        username: payload.username.trim(),
      });
    });

    socket.on("stop-typing", () => {
      socket.broadcast.emit("stop-typing");
    });

    socket.on("disconnect", () => {
         console.log(`🔴 User Disconnected: ${socket.id}`);
      onlineUsers = Math.max(onlineUsers - 1, 0);
      broadcastOnlineCount(io);
    });
  });
};


