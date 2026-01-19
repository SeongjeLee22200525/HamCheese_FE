"use client";

import { useEffect, useState } from "react";
import { getSendbird } from "@/lib/sendbird/sendbird";
import { useUserStore } from "@/stores/useUserStore";
import ChatFab from "./ChatFab";
import ChatPanel from "./ChatPanel";

import { useChatWidget } from "@/hooks/chat/useChatWidget";
import { useChannelList } from "@/hooks/chat/useChannelList";

export default function ChatWidgetRoot() {
  const myId = useUserStore((s) => s.user?.myId);

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState(false); // 🔥 추가

  const { closeChat } = useChatWidget();

  /* 🔥 Sendbird 연결 보장 */
  useEffect(() => {
    if (!myId) return;

    const sb = getSendbird();

    sb.connect(String(myId))
      .then(() => {
        setConnected(true); // 🔥 여기서만 true
      })
      .catch(console.error);
  }, [myId]);

  /* 🔥 connect 이후에만 채널 조회 */
  const channels = useChannelList(connected);

  const hasUnread = channels.some((ch) => ch.unreadMessageCount > 0);

  const handleOpen = () => {
    setMounted(true);
    requestAnimationFrame(() => setOpen(true));
  };

  const handleClose = () => {
    setOpen(false);
    closeChat();
    setTimeout(() => setMounted(false), 300);
  };

  return (
    <>
      {mounted && (
        <div
          className="fixed inset-0 z-9998 bg-black/30"
          onClick={handleClose}
        >
          <div
            className={`absolute right-0 bottom-0 h-full overflow-hidden
              shadow-[0px_-2px_20px_0px_rgba(225,237,240,1.00)]
              transition-[width] duration-300 ease-out
              rounded-tl-[20px] rounded-bl-[20px]
              ${open ? "w-225" : "w-0"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-225 h-full">
              <ChatPanel onClose={handleClose} />
            </div>
          </div>
        </div>
      )}

      <ChatFab onClick={handleOpen} hasUnread={hasUnread} />
    </>
  );
}
