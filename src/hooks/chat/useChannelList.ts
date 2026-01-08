import { useEffect, useState } from "react";
import { getSendbird } from "@/lib/sendbird/sendbird";
import type { GroupChannel } from "@sendbird/chat/groupChannel";
import { GroupChannelHandler } from "@sendbird/chat/groupChannel";
import { useUserStore } from "@/stores/useUserStore";

export function useChannelList(connected: boolean) {
  const [channels, setChannels] = useState<GroupChannel[]>([]);
  const sb = getSendbird();
  useEffect(() => {
    if (!connected) return;

    let alive = true;

    const init = async () => {
      try {
        const myId = useUserStore.getState().user?.myId;
        if (!myId) return;

        // 🔥 1️⃣ Sendbird 연결 보장 (핵심)
        if (!sb.currentUser) {
          await sb.connect(String(myId));
        }

        if (!alive) return;

        // 🔥 2️⃣ 채널 리스트 조회
        const query = sb.groupChannel.createMyGroupChannelListQuery({
          includeEmpty: false,
          limit: 20,
        });

        const result = await query.next();
        if (!alive) return;

        setChannels(result);
      } catch (e) {
        console.error("❌ useChannelList init error", e);
      }
    };

    init();

    // 🔥 3️⃣ 실시간 채널 업데이트 핸들러
    const handlerId = "channel-list-handler";

    const handler = new GroupChannelHandler({
      onChannelChanged: (updated) => {
        const updatedChannel = updated as GroupChannel;

        setChannels((prev) => {
          const exists = prev.find((ch) => ch.url === updatedChannel.url);

          if (exists) {
            return prev.map((ch) =>
              ch.url === updatedChannel.url ? updatedChannel : ch
            );
          }

          // 새 메시지 온 채널 → 최상단
          return [updatedChannel, ...prev];
        });
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
