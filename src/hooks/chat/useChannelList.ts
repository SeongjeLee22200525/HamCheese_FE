import { useEffect, useState } from "react";
import { sb } from "@/lib/sendbird/sendbird";
import type { GroupChannel } from "@sendbird/chat/groupChannel";
import { GroupChannelHandler } from "@sendbird/chat/groupChannel";

export function useChannelList(connected: boolean) {
  const [channels, setChannels] = useState<GroupChannel[]>([]);

  useEffect(() => {
    if (!connected) return;

    const query = sb.groupChannel.createMyGroupChannelListQuery({
      includeEmpty: false,
      limit: 20,
    });

    query.next().then(setChannels);

    const handler = new GroupChannelHandler({
      onChannelChanged: (updated) => {
        const updatedChannel = updated as GroupChannel; // 🔥 핵심

        setChannels((prev) => {
          const exists = prev.find((ch) => ch.url === updatedChannel.url);

          if (exists) {
            return prev.map((ch) =>
              ch.url === updatedChannel.url ? updatedChannel : ch
            );
          }

          return [updatedChannel, ...prev];
        });
      },
    });

    sb.groupChannel.addGroupChannelHandler("channel-list-handler", handler);

    return () => {
      sb.groupChannel.removeGroupChannelHandler("channel-list-handler");
    };
  }, [connected]);

  return channels;
}
