"use client";

import { useEffect, useState } from "react";
import { sb } from "@/lib/sendbird/sendbird";
import { useUserStore } from "@/stores/useUserStore";
import ChatFab from "./ChatFab";
import ChatPanel from "./ChatPanel";
import { getOrCreateChannel } from "@/lib/sendbird/channel";
import type { GroupChannel } from "@sendbird/chat/groupChannel";

export default function ChatWidgetRoot() {
  const myId = useUserStore((s) => s.user?.myId);
  const [open, setOpen] = useState(false);
  const [channel, setChannel] = useState<GroupChannel | null>(null);

  useEffect(() => {
    if (!myId) return;
    sb.connect(String(myId));
  }, [myId]);

  // 🔥 외부에서 채팅 열기 (조각 건네기용)
  useEffect(() => {
    const handler = async (e: any) => {
      const targetId = String(e.detail);
      if (!myId) return;

      const ch = await getOrCreateChannel(String(myId), targetId);
      setChannel(ch);
      setOpen(true);
    };

    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, [myId]);

  return (
    <>
      {open && (
        <ChatPanel
          channel={channel}
          onSelect={setChannel}
          onClose={() => {
            setOpen(false);
            setChannel(null);
          }}
        />
      )}
      <ChatFab onClick={() => setOpen((p) => !p)} />
    </>
  );
}
