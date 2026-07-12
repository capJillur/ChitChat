import { useEffect, useRef, useState } from "react";

import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";

import type { Message } from "../types/message";

import { socket } from "../services/socket";
import { sendMessage, getMessages } from "../api/message.api";
import { getUserCount } from "../api/auth.api";

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
  const [totalUsers, setTotalUsers] = useState(0);
  const [error, setError] = useState("");
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
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
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        setTypingUser("");
        typingTimeoutRef.current = null;
      }, 1200);
    };

    const handleOnlineCount = (payload: { count: number }) => {
      setOnlineCount(payload.count ?? 0);
    };

    socket.on("new-message", handleNewMessage);
    socket.on("user-typing", handleTyping);
    socket.on("online-users", handleOnlineCount);

    return () => {
      socket.off("new-message", handleNewMessage);
      socket.off("user-typing", handleTyping);
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
      }
    };

    loadMessages();
    loadUserCount();
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

  const handleTypingIndicator = () => {
    socket.emit("user-typing", { username: currentUser });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden flex flex-col">

        <div className="bg-white border-b border-zinc-100 px-6 py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col items-start text-left w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <h1 
                  className="text-xl font-semibold tracking-tight"
                  style={{ color: "#18181b" }}
                >
                  ChitChat
                </h1>
              </div>
              <p className="mt-0.5 text-xs text-zinc-400">
                A minimal real-time communications workspace.
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-zinc-50 border border-zinc-200/60 px-2.5 py-0.5 text-xs font-medium text-zinc-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Active as <span className="font-semibold text-zinc-800">{currentUser}</span>
              </div>
            </div>

            <div className="flex flex-row items-center gap-3 text-xs sm:justify-end">
              <div className="rounded-md bg-zinc-50 border border-zinc-200/60 px-3 py-1.5 font-medium text-zinc-500">
                <span className="text-zinc-800 font-semibold">{onlineCount}</span> online{" "}
                <span className="text-zinc-300 mx-1">|</span> {totalUsers} registered
              </div>
              <button
                onClick={onLogout}
                className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
              >
                Log out
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#FCFCFC] px-6 py-5 flex-1">
          <div className="rounded-lg border border-zinc-200/60 bg-white overflow-hidden shadow-2xs">
            {loading ? (
              <div className="h-96 flex items-center justify-center bg-zinc-50/50 px-6 py-10">
                <p className="text-xs font-medium text-zinc-400 tracking-wide animate-pulse">
                  Syncing workspace history...
                </p>
              </div>
            ) : (
              <>
                <ChatBox messages={messages} currentUsername={currentUser} />

                <div className="border-t border-zinc-100 bg-zinc-50/60 px-5 py-2.5">
                  {typingUser ? (
                    <p className="text-xs text-zinc-500 flex items-center gap-1">
                      <span className="font-semibold text-zinc-700">{typingUser}</span> is typing
                      <span className="animate-bounce">.</span>
                      <span className="animate-bounce [animation-delay:0.2s]">.</span>
                      <span className="animate-bounce [animation-delay:0.4s]">.</span>
                    </p>
                  ) : (
                    <p className="text-xs text-zinc-400">Encrypted real-time streaming enabled.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {error ? (
          <div className="bg-red-50/80 border-t border-b border-red-100 text-red-600 text-xs px-6 py-2.5 font-medium">
            ⚠️ {error}
          </div>
        ) : null}

        <div className="bg-white px-6 pb-6 pt-2">
          <MessageInput
            onSend={handleSend}
            onTyping={handleTypingIndicator}
            sending={sending}
          />
        </div>

      </div>
    </div>
  );
};

export default ChatPage;