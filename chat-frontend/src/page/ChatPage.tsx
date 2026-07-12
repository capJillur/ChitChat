import { useEffect, useMemo, useRef, useState } from "react";

import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";
import Sidebar from "../components/Sidebar";

import type { Message } from "../types/message";

import { socket } from "../services/socket";
import { sendMessage, getMessages } from "../api/message.api";
import { getUserCount, getUsers } from "../api/auth.api";

interface Props {
  currentUser: string;
  onLogout: () => void;
}

const ChatPage = ({ currentUser, onLogout }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [onlineCount, setOnlineCount] = useState(1);
  const [typingUser, setTypingUser] = useState("");
  const stopTypingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [userList, setUserList] = useState<string[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (stopTypingTimeoutRef.current) {
        clearTimeout(stopTypingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleNewMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleTyping = (payload: { username: string }) => {
      if (!payload?.username || payload.username === currentUser) return;

      setTypingUser(payload.username);
    };

    const handleStopTyping = () => {
      setTypingUser("");
    };

    const handleOnlineCount = (payload: { count: number }) => {
      setOnlineCount(payload.count ?? 0);
    };

    socket.on("new-message", handleNewMessage);
    socket.on("user-typing", handleTyping);
    socket.on("stop-typing", handleStopTyping);
    socket.on("online-users", handleOnlineCount);

    return () => {
      socket.off("new-message", handleNewMessage);
      socket.off("user-typing", handleTyping);
      socket.off("stop-typing", handleStopTyping);
      socket.off("online-users", handleOnlineCount);
    };
  }, [currentUser]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);
        setError("");

        const history = await getMessages();
        setMessages(history);
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load chat history."
        );
      } finally {
        setLoading(false);
      }
    };

    const loadUserCount = async () => {
      try {
        const result = await getUserCount();
        setTotalUsers(result.data.count ?? 0);
      } catch {
        // ignore
      }
    };

    const loadUsers = async () => {
      try {
        const result = await getUsers();
        const names =
          result.data.users?.map((user: { username: string }) => user.username) ?? [];
        setUserList(names);
      } catch {
        // ignore
      }
    };

    loadMessages();
    loadUserCount();
    loadUsers();
  }, []);

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    try {
      setError("");
      setSending(true);
      await sendMessage(currentUser, message.trim());
    } catch (sendError) {
      setError(
        sendError instanceof Error
          ? sendError.message
          : "Failed to send message."
      );
    } finally {
      setSending(false);
    }
  };

  const filteredUsers = useMemo(
    () =>
      userList.filter((username) =>
        username.toLowerCase().includes(userSearch.toLowerCase())
      ),
    [userList, userSearch]
  );

  const emitTyping = () => {
    // show locally immediately so the user sees the handwritten indicator
    setTypingUser(currentUser);

    socket.emit("user-typing", { username: currentUser });

    if (stopTypingTimeoutRef.current) {
      clearTimeout(stopTypingTimeoutRef.current);
    }

    stopTypingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop-typing");
      setTypingUser("");
      stopTypingTimeoutRef.current = null;
    }, 1000);
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="flex h-full flex-col">
        

        <div className="flex h-full flex-1 flex-col overflow-hidden lg:flex-row">
          <Sidebar
            userList={filteredUsers}
            userSearch={userSearch}
            setUserSearch={setUserSearch}
            onlineCount={onlineCount}
            totalUsers={totalUsers}
          />

          <main className="flex h-full flex-1 flex-col overflow-hidden px-4 py-4 sm:px-6">
    

            <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-slate-900 shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-700 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base text-left font-semibold text-slate-100">Messenger</h3>
                  <p className="text-sm text-left text-slate-400">Everyone in the room</p>
                </div>
                <div className="text-xs rounded-full bg-slate-950 px-3 py-1 font-semibold text-slate-300">
                  Active: {onlineCount} / {totalUsers}
                </div>
              </div>

              <div className="flex flex-1 flex-col overflow-hidden">
                <div className="flex-1 overflow-hidden">
                  {loading ? (
                    <div className="flex h-full items-center justify-center bg-slate-950 px-6 py-10">
                      <p className="text-sm font-medium text-slate-400 animate-pulse">
                        Syncing conversation history...
                      </p>
                    </div>
                  ) : (
                    <ChatBox messages={messages} currentUsername={currentUser} typingUser={typingUser} />
                  )}
                </div>

                

                <div className="border-t border-transparent bg-slate-950 p-4">
                  <MessageInput
                    onSend={handleSend}
                    onTyping={emitTyping}
                    sending={sending}
                  />
                </div>
              </div>
            </div>

            {error ? (
              <div className="mt-4 rounded-3xl border border-red-600 bg-red-950/20 px-4 py-3 text-sm text-red-200">
                ⚠️ {error}
              </div>
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
