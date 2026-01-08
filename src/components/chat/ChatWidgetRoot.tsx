"use client";

import { useEffect, useState } from "react";
import { sb } from "@/lib/sendbird/sendbird";
import { useUserStore } from "@/stores/useUserStore";
import ChatFab from "./ChatFab";
import ChatPanel from "./ChatPanel";

export default function ChatWidgetRoot() {
  const myId = useUserStore((s) => s.user?.myId);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!myId) return;
    sb.connect(String(myId));
  }, [myId]);

  const handleOpen = () => {
    setMounted(true); // 1️⃣ 먼저 mount (w-0 상태)
    requestAnimationFrame(() => {
      setOpen(true); // 2️⃣ 다음 프레임에서 w-225
    });
  };

  const handleClose = () => {
    setOpen(false); // w-225 → w-0
    setTimeout(() => {
      setMounted(false); // 애니메이션 끝나고 unmount
    }, 300);
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
              <ChatPanel onClose={handleClose} />
            </div>
          </div>
        </div>
      )}

      <ChatFab onClick={handleOpen} />
    </>
  );
}
