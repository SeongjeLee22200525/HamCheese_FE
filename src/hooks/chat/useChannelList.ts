import { useEffect, useState } from "react";
import { getSendbird } from "@/lib/sendbird/sendbird";
import type { GroupChannel } from "@sendbird/chat/groupChannel";
import { GroupChannelHandler } from "@sendbird/chat/groupChannel";

export function useChannelList(connected: boolean) {
  const [channels, setChannels] = useState<GroupChannel[]>([]);
  const sb = getSendbird();

  useEffect(() => {
    if (!connected) return;
    if (!sb.currentUser) return; // 🔥 connect는 여기서 절대 안 함

    let alive = true;

    const fetchChannels = async () => {
      try {
        const query = sb.groupChannel.createMyGroupChannelListQuery({
          includeEmpty: false,
          limit: 20,
        });

        const result = await query.next();
        if (!alive) return;

        setChannels(result);
      } catch (e) {
        console.error("❌ useChannelList fetch error", e);
      }
    };

    // ✅ 최초 로딩
    fetchChannels();

    const handlerId = "channel-list-handler";

    const handler = new GroupChannelHandler({
      // 🔥 unread 증가 핵심
      onMessageReceived: (channel) => {
        const updated = channel as GroupChannel;

        setChannels((prev) => {
          const exists = prev.find((ch) => ch.url === updated.url);

          if (exists) {
            return [updated, ...prev.filter((ch) => ch.url !== updated.url)];
          }

          return [updated, ...prev];
        });
      },

      // 채널 정보 변경 (읽음 처리 등)
      onChannelChanged: (channel) => {
        const updated = channel as GroupChannel;

        setChannels((prev) =>
          prev.map((ch) => (ch.url === updated.url ? updated : ch))
        );
      },
    });

    sb.groupChannel.addGroupChannelHandler(handlerId, handler);

    return () => {
      alive = false;
      sb.groupChannel.removeGroupChannelHandler(handlerId);
    };
  }, [connected]);

  return channels;
}
