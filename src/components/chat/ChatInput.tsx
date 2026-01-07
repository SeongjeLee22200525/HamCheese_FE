"use client";

import { useState } from "react";

export default function ChatInput({
  onSend,
}: {
  onSend: (text: string) => void;
}) {
  const [text, setText] = useState("");

  return (
    <div className="border-t px-4 py-3 flex items-center gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSend(text);
            setText("");
          }
        }}
        placeholder="메시지를 입력하세요"
        className="flex-1 outline-none text-sm"
      />
      <button
        onClick={() => {
          onSend(text);
          setText("");
        }}
        className="text-[#00C3CC] font-bold"
      >
        전송
      </button>
    </div>
  );
}
