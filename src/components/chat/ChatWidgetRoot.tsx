"use client";

import { useEffect, useState } from "react";
import { sb } from "@/lib/sendbird/sendbird";
import { useUserStore } from "@/stores/useUserStore";
import ChatFab from "./ChatFab";
import ChatPanel from "./ChatPanel";
import Snackbar from "../common/Snackbar";
import { useChatWidget } from "@/hooks/chat/useChatWidget";
import { useChannelList } from "@/hooks/chat/useChannelList"; // 🔥 추가

export default function ChatWidgetRoot() {
  const myId = useUserStore((s) => s.user?.myId);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<string | null>(null);
  const { closeChat } = useChatWidget();

  /* 🔥 채널 리스트 (source of truth) */
  const channels = useChannelList(!!myId);

  /* 🔥 unread 판단 */
  const hasUnread = channels.some((ch) => ch.unreadMessageCount > 0);

  useEffect(() => {
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
            className={`
              absolute right-0 bottom-0 h-full
              overflow-hidden
              transition-[width] duration-300 ease-out
              ${open ? "w-225" : "w-0"}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-225 h-full">
              <ChatPanel
                onClose={handleClose}
                onAccept={() => setSnackbar("대화가 성사되었어요!")}
              />
            </div>
          </div>
        </div>
      )}

      {snackbar && (
        <Snackbar message={snackbar} onClose={() => setSnackbar(null)} />
      )}

      {/* 🔥 unread 기준 아이콘 */}
      <ChatFab onClick={handleOpen} hasUnread={hasUnread} />
    </>
  );
}
