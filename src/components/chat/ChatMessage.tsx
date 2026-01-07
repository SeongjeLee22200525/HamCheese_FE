"use client";

import type { UserMessage } from "@sendbird/chat/message";

export default function ChatMessage({
  message,
  isMine,
}: {
  message: UserMessage;
  isMine: boolean;
}) {
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[70%] px-3 py-2 rounded-lg text-sm
          ${
            isMine
              ? "bg-[#00C3CC] text-white rounded-br-none"
              : "bg-[#F5F8F8] text-[#222829] rounded-bl-none"
          }
        `}
      >
        {message.message}
      </div>
    </div>
  );
}
