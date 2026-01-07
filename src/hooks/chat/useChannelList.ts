import { useEffect, useState } from "react";
import {sb} from "@/lib/sendbird/sendbird";
import type { GroupChannel } from "@sendbird/chat/groupChannel";

export function useChannelList(connected: boolean) {
  const [channels, setChannels] = useState<GroupChannel[]>([]);

  useEffect(() => {
    if (!connected) return;

    const query = sb.groupChannel.createMyGroupChannelListQuery({
      includeEmpty: false,
      limit: 20,
    });

    query.next().then(setChannels);
  }, [connected]);

  return channels;
}
