"use client";

import { useEffect, useState } from "react";
import { sb } from "@/lib/sendbird/sendbird";
import type { GroupChannel } from "@sendbird/chat/groupChannel";
import { GroupChannelHandler } from "@sendbird/chat/groupChannel";

type Props = {
  onSelect: (c: GroupChannel) => void;
  currentChannelUrl?: string | null; // 🔥 선택된 채널
};

function formatRelativeTime(ts: number) {
  const diff = Date.now() - ts;
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);

  if (sec < 60) return "방금";
  if (min < 60) return `${min}분 전`;
  if (hour < 24) return `${hour}시간 전`;
  if (day === 1) return "어제";
  return `${day}일 전`;
}

export default function ChatList({ onSelect, currentChannelUrl }: Props) {
  const [channels, setChannels] = useState<GroupChannel[]>([]);

  useEffect(() => {
    const query = sb.groupChannel.createMyGroupChannelListQuery({
      includeEmpty: true,
      limit: 20,
    });

    query.next().then(setChannels);

    const handler = new GroupChannelHandler({
      onChannelChanged: (updated) => {
        const updatedChannel = updated as GroupChannel;

        setChannels((prev) =>
          prev.map((ch) =>
            ch.url === updatedChannel.url ? updatedChannel : ch
          )
        );
      },
    });

    sb.groupChannel.addGroupChannelHandler("chat-list-handler", handler);

    return () => {
      sb.groupChannel.removeGroupChannelHandler("chat-list-handler");
    };
  }, []);

  return (
    <div className="flex-1 overflow-y-auto">
      {channels.map((ch) => {
        const other = ch.members.find(
          (m) => m.userId !== sb.currentUser?.userId
        );
        if (!other) return null;

        const lastTs = ch.lastMessage?.createdAt;
        const isActive = ch.url === currentChannelUrl;

        return (
          <div
            key={ch.url}
            onClick={() => onSelect(ch)}
            className={`
              px-10 py-4 flex gap-5.5 cursor-pointer
              ${isActive ? "bg-[#FFFFFF]" : ""}
              hover:bg-[#CEDBDE]
              active:bg-[#B7C4C7]
            `}
          >
            {/* 프로필 이미지 */}
            <img
              src={other.profileUrl || "/profile.svg"}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />

            {/* 텍스트 영역 */}
            <div className="flex-1 min-w-0">
              {/* 이름 + 시간 */}
              <div className="flex justify-between items-center">
                <div className="font-bold text-base truncate">
                  {other.nickname || other.userId}
                </div>
                {lastTs && (
                  <span className="text-base text-[#838F91] whitespace-nowrap ml-2">
                    {formatRelativeTime(lastTs)}
                  </span>
                )}
              </div>

              {/* 메시지 + unread */}
              <div className="flex items-center justify-between">
                {/* 왼쪽: 마지막 메시지 */}
                <div className="min-w-0">
                  <div className="text-base text-[#838F91] truncate w-33">
                    {ch.lastMessage?.message ?? "대화를 시작해보세요"}
                  </div>
                </div>

                {/* 오른쪽: unread badge */}
                {ch.unreadMessageCount > 0 && (
                  <div className="min-w-4.5 h-4.5 rounded-full bg-[#FF5454] text-white text-xs font-bold flex items-center justify-center">
                    {ch.unreadMessageCount}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
