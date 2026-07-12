import  type { Message } from "../types/message";

interface Props {
  message: Message;
  isOwn?: boolean;
}

const MessageBubble = ({ message, isOwn = false }: Props) => {
  return (
    <div
      className={`flex ${
        isOwn ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 shadow
        ${
          isOwn
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-900"
        }`}
      >
        <p className={`text-xs font-semibold mb-1 ${isOwn ? 'text-white' : 'text-slate-700'}`}>
          {isOwn ? 'You' : message.username}
        </p>

        <p>{message.message}</p>

        <p
          className={`text-[10px] mt-2 text-right ${
            isOwn
              ? "text-blue-100"
              : "text-gray-500"
          }`}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;