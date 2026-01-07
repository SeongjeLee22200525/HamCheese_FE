"use client";

import type { UserMessage } from "@sendbird/chat/message";

type Props = {
  message: UserMessage;
  isMine: boolean;
  profileUrl?: string;
  showProfile: boolean;
  showTime: boolean;
};

function formatTime(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function ChatMessage({
  message,
  isMine,
  profileUrl,
  showProfile,
  showTime,
}: Props) {
  return (
    <div
      className={`flex items-end gap-3 ${
        isMine ? "justify-end" : "justify-start"
      }`}
    >
      {/* 🔥 마지막 메시지에만 프로필 */}
      {!isMine && showProfile && (
        <img
          src={profileUrl || "/profile.svg"}
          alt="profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      )}

      {!isMine && !showProfile && <div className="w-8" />}

      {/* ✅ 내 메시지: 시간 먼저 */}
      {isMine && showTime && (
        <div className="text-[11px] text-[#838F91] mt-1 whitespace-nowrap">
          {formatTime(message.createdAt)}
        </div>
      )}

      {/* 말풍선 (기존 그대로) */}
      <div
        className={`
          max-w-[70%] px-4 py-2 rounded-tl-[20px] rounded-tr-[20px] text-base
          ${
            isMine
              ? "bg-[#00C3CC] text-white rounded-br rounded-bl-[20px]"
              : "bg-[#F5F8F8] text-[#222829] rounded-bl rounded-br-[20px]"
          }
        `}
      >
        {message.message}
      </div>

      {/* ✅ 상대 메시지: 시간 나중에 */}
      {!isMine && showTime && (
        <div className="text-[11px] text-[#838F91] mt-1 whitespace-nowrap">
          {formatTime(message.createdAt)}
        </div>
      )}
    </div>
  );
}
