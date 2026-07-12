import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";
import type { Message } from "../types/message";

interface Props {
  messages: Message[];
  currentUsername: string;
  typingUser: string;
}

const ChatBox = ({ messages, currentUsername, typingUser }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (messages.length === 0) {
  return (
    <div className="h-[500px] flex items-center justify-center bg-slate-50">
      <p className="text-slate-500">
        No messages yet. Start the conversation!
      </p>
    </div>
  );
}

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-slate-50">
      <div className="flex-1 overflow-y-auto p-5 space-y-4 relative">
        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg}
            isOwn={msg.username === currentUsername}
          />
        ))}

        <div ref={bottomRef} />

        {typingUser && typingUser !== currentUsername ? (
          <div className="mt-2 flex justify-end">
            <span className="text-sm text-slate-600">
              {`${typingUser} is typing...`}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChatBox;