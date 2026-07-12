import { useEffect, useRef, useState } from "react";

interface Props {
  onSend: (message: string) => Promise<void>;
  onTyping: () => void;
  sending: boolean;
}

const MessageInput = ({
  onSend,
  onTyping,
  sending,
}: Props) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return;
    await onSend(message.trim());
    setMessage("");
    inputRef.current?.focus();
  };

  const handleTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    onTyping();

    typingTimeoutRef.current = setTimeout(() => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    }, 1000);
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type your message..."
          value={message}
          disabled={sending}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1 rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-slate-900 placeholder-slate-400"
        />

        <button
          onClick={handleSend}
          disabled={sending || !message.trim()}
          className="rounded-lg bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default MessageInput;