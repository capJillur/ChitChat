import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";
import type { Message } from "../types/message";

interface Props {
  messages: Message[];
  currentUsername: string;
}

const ChatBox = ({ messages, currentUsername }: Props) => {
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
    <div className="h-[500px] overflow-y-auto p-5 space-y-4 bg-slate-50">
      {messages.map((msg) => (
        <MessageBubble
          key={msg._id}
          message={msg}
          isOwn={msg.username === currentUsername}
        />
      ))}

      {/* Invisible element to scroll into view */}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatBox;