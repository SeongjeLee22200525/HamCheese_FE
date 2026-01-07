"use client";

import { useEffect, useState } from "react";
import { sb } from "@/lib/sendbird/sendbird";
import type { GroupChannel } from "@sendbird/chat/groupChannel";

type Props = {
  onSelect: (c: GroupChannel) => void;
};

export default function ChatList({ onSelect }: Props) {
  const [channels, setChannels] = useState<GroupChannel[]>([]);

  useEffect(() => {
    const query = sb.groupChannel.createMyGroupChannelListQuery({
      includeEmpty: true,
      limit: 20,
    });

    query.next().then(setChannels);
  }, []);

  return (
    <div className="flex-1 overflow-y-auto">
      {channels.map((ch) => {
        const other = ch.members.find(
          (m) => m.userId !== sb.currentUser?.userId
        );

        return (
          <div
            key={ch.url}
            onClick={() => onSelect(ch)}
            className="
              px-6 py-4 cursor-pointer
              border-b hover:bg-[#F5F8F8]
            "
          >
            <div className="font-bold text-sm text-[#222829]">
              {other?.userId ?? "알 수 없음"}
            </div>
            <div className="text-xs text-[#838F91] truncate mt-1">
              {ch.lastMessage?.message ?? "대화를 시작해보세요"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
