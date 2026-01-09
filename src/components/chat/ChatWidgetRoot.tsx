"use client";

import { useEffect, useState } from "react";
import { getSendbird } from "@/lib/sendbird/sendbird";
import { useUserStore } from "@/stores/useUserStore";
import ChatFab from "./ChatFab";
import ChatPanel from "./ChatPanel";

import { useChatWidget } from "@/hooks/chat/useChatWidget";
import { useChannelList } from "@/hooks/chat/useChannelList"; // 🔥 추가
import ChatPokingSection from "./ChatPokingSection";

export default function ChatWidgetRoot() {
  const myId = useUserStore((s) => s.user?.myId);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const { closeChat } = useChatWidget();

  const channels = useChannelList(!!myId);
  const hasUnread = channels.some((ch) => ch.unreadMessageCount > 0);

  useEffect(() => {
    const sb = getSendbird();
    if (!myId) return;
    sb.connect(String(myId));
  }, [myId]);

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
          className="fixed inset-0 z-[9998] bg-black/30"
          onClick={handleClose}
        >
          <div
            className={`absolute right-0 bottom-0 h-full overflow-hidden shadow-[0px_-2px_20px_0px_rgba(225,237,240,1.00)]
              transition-[width] duration-300 ease-out rounded-tl-[20px] rounded-bl-[20px]
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
